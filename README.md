# To-Do List Project README

This To-Do list application will currently allow 1 user to Create a Project List or Delete the list all together. It will also allow a user to add items to the Project List and Delete the Items form the List once they have been completed.

## How to run the test suite
1. Fork and clone the repository

2. `cd` into the correct directory.

3. Make sure to `bundle install` in your terminal to make sure all your gems are up to date

4. After deleting the database, re-seed the database by first running `db:migrate` in your terminal to make sure the database is structured correctly.

5. Once the migration files are in order, run `db:seed` in your terminal to repopulate the database.

6. To run the program, enter `rails s` in your console to run the application!

7. Visit the `localhost/3000` in the browser to view the application

## CRUD Actions

- Users can be CREATED and they can CREATE a Project List and its To-Do Items.
- Users can READ project list and its items.
- Users can DELETE their projects lists all togehter or individual items off a list.

## Difficulties 

* Git and needing to wipe out the reposity the second day and reupload it.

* Merging to and from the right branch without breaking things.

* Getting users to display in a drop down menu with BootStrap.

* CSSing the site with BootStrap but then trying to customize it further.

## Stretch Goals

* Getting each user to display their list of Projects and the items within the list. Currently all of the relations are there for this but the display is based on 1 users and all of their Project Lists.

* The ability for a user to log in and out.

## contributors

* [Bryn Dunnells](https://github.com/BluesBaka)
* [DaNeil Coulthard](https://github.com/caffiendkitten)

#### Learn.co Educational Content License

Copyright (c) 2015 Flatiron School, Inc

The Flatiron School, Inc. owns this Educational Content. However, the Flatiron School supports the development and availability of educational materials in the public domain. Therefore, the Flatiron School grants Users of the Flatiron Educational Content set forth in this repository certain rights to reuse, build upon and share such Educational Content subject to the terms of the Educational Content License set forth [here](http://learn.co/content-license) (http://learn.co/content-license). You must read carefully the terms and conditions contained in the Educational Content License as such terms govern access to and use of the Educational Content.

Flatiron School is willing to allow you access to and use of the Educational Content only on the condition that you accept all of the terms and conditions contained in the Educational Content License set forth [here](http://learn.co/content-license) (http://learn.co/content-license).  By accessing and/or using the Educational Content, you are agreeing to all of the terms and conditions contained in the Educational Content License.  If you do not agree to any or all of the terms of the Educational Content License, you are prohibited from accessing, reviewing or using in any way the Educational Content.

