## Overview
The general approach here was to attempt and treat Slate as a controlled component, using the redux store as a source of truth. This is the typical react / redux architecture, but Slate appears to not do well supporting that construct. Slate seems to want to own and controll all interactions / state of the components it renders. As such I probably wouldnt confidently recommend this approach.

The other approach would be to lean further into the Slate ecosystem and utilize it as the source of truth for the actual statement. A few potential negatives about that approach:
- This might make it difficult components outside of the Slate dashboard to interact meaningfully with Slate. 
- Slate seems really coupled to the concept of the HTML dom. This might make building interactive things with SVGs or Canvas elements more difficult.


There may be solutions deeper in the Slate customization ecosystem that could be investigated to provide a more elegant solution.

## Notes
This project was done with limited time and as a POC. As such the following things would need to be done before this would serve as the basis for a production project.

- Decoupling of Slate constructs from components / state. It's recommended we wrap and rexport these interfaces as appropriate to the project and not store slate specific structures in our store. 
- inclusion of redux middleware (thunks / sagas) for middleware appropriate tasks. 
- bolster error handling / null checking
- introduce a styling and design system strategy
- linting / formatting
- naming conventions, consistenty and team agreements
- implicity any should be turned off to force more robust typing
- More extenisive unit testing
- More detailed concessions are called out with the `Note` prefix in code


## Known Issues
- there appears to be a bunch of default logic associated with elements in slate. So selecting elemnts and hitting the delete key will naturally delete their element in the tree. This probably isn't what you want for a statement creation tool as you'd probably like a rigid width / height. I'm not going to bother overriding it for now.
- No keyboard shortcuts are implemented 
- selection is limited to a single cell