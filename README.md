"https://api.cloudinary.com/v1_1/<application_name>/image/upload", 

use watch instead of what used for image upload.

in chakra-UI
Container 
  Box
    Stack
      Text
  Box
    Tabs
      TabList
        Tab
      TabPanels
        TabPanel
          ...
        TabPanel
          ...

You have $ref $id $db

u have 
router.route('/..').post(postMethod).get(getMethod).patch(patchMethod)
router.post('/..', postMethod)
use either way, chain if you wish to or just simple one.

404 500 these are by default provided by nextjs though you can create a custom 
one by just pages/400.js

A Parser like babel-eslint will be suitable for ESLint. It is because ESLint is not compatible with modern JavaScript syntax. So, you need to specify the parser to use for your configuration.
eslint parser was giving errors like unexpected token for div and for custom 
components thus you need to use another parser like eslint parser which is 
compatible/understands with modern javascript syntax.

so I got an error earlier for using div or form or say any html tag
and then upon researching a little bit I found its the parser which parses
my code and finds out that this html tag doesn't belong to javascript and 
thus it throws an error. So I changed parser from default Espree parser so I 
changed it to babel-eslint and it worked but then I saw this parser has overridden
the rules I had written explicitly. So I changed it or say removed and instead 
got into parserOptions and included jsx syntax that's the real solution.

## Making a middleware in nextJS has many ways
### by just importing a function which will be called from a different file and will work as middleware.
since what middleware is if not a function having state of req, res due to being included in .get() as a middle parameter
### better one since I am using NextJS 
will be to create a middleware folder as also done by Prototion and do what there ?
create middlewares and provide the callback function(or to say next function) to middleware (common convention would be handler)and you are done.
### middleware.js or middleware.tsx
use conditional statements to handle many middlewares while config can be used to handle only one middleware.
I still have to find out more about that how could I take in req. in middleware.js or middleware.tsx


