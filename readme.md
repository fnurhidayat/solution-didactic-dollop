# CRUD Basic
## Rule
1. Create function to create data, which require 1 arguments that is object
2. Just seperate your own function in switch case;
3. Read function, only require 1 argument in the process.argv, and it's the id
4. Update function, require 2 argument, id and object.

## Schema
### Users
```
{
  id: number,
  name: string,
  email: string,
  password: string
}
```
### Post
```
{
  id: number,
  title: string,
  body: string
}
```

## New Task

1. Create class for User/Post
2. That class will able to do save in the data folder.
3. User/Post class will extend from ActiveRecord
4. ActiveRecord should have this following methods:
   * Create
   * Update
   * Read - Find By ID
   * Delete
