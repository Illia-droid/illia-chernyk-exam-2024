1. Fix warnings in console.
2. Fix squadhelp logo in Header and Payment.
3. Fix phone number : create constant and use it.
4. Refactor Home page : 
    a. Create WhySquadhelp component;
    b. Create HowDoNameContestWork component;
    c. Rename Home.jsx => index.jsx and corrected path;
    d. Create AdvInfo component;

** All that remains is to fix the styles and dashboard buttons.

============================================================================================

5. Refactor class components to functional ( exept HOCs ).
6. Fix files uploading:
    a. Fix images uploading:
        * use multipart/form-data;
        * change images path in constants;
        * fixed logic of functional component ImageUpload;
    b. Fix files uploading:
        * use multipart/form-data;  
        * fixed logic of functional component FieldFileInput;
        ?? need to fix warning in console "A non-serializable value was detected" ?? 

7. Fix payment:
        * set the initial values in Payment form (dev);
        * commented out expiry in validation scheme;
        * fixed PayInput mask;
        * fixed price display depending on count of contests 
        * added a discount depending on bundle(1-$100, 2-$160(20%), 3-$210(30%));


8. Refactor HOCs:
        * organized HOCs into one folder and set up exports;
        * changed names and replaced it in App.js.
        * fixed the application crash and as a result of going to a page that required authorization, now you go to the Login page;
        * refactored HOCs from class to functional components. 
        * added additionalProps in withAuth HOC for correct operation of creating constests.

9. Fix dashboards:
    a. prepared for role of Moderator and rename* Dashboard.jsx to index.jsx + pathes;
    b. Fix customer`s dashboard:
        * rename*;
        * fixed logic of ContestsContainer component (there is no constant rerendering of identical contests);
        * refactor customer`s dashboard.
    c.  Fix creator`s dashboard:   
        * fixed filters in CreatorDashboard;

10. Fix chat:
    a. Fix sending and rendering messages in chat:
        * rename*;
        * add back to dialog list when unmounting;
        * fixed scrolling to the last message when sending a new one and when rendering a chat;
        * fixed favorite chat;
        * fixed duplicate messages;
        
11. Fix offers:
        * fixed rendering of button "Send offer";
        * fixed function resolveOffer (returns the winning offer, not the first offer in the array).      

12. Fix cashout:
        * added an initialian value for "sum" input (fixed warning in console - now this input is controlled).

13. Client refactoring:
     a. Page components refactoring:
        * rename*;
        * refactoring connect() with hooks useDispatch() and useSelector();
        * optimization of functions, destructuring of constants;
        * using json files for data.
     b. Components refactoring:
        * rename*;
        * refactoring connect() with hooks useDispatch() and useSelector();
        * optimization of functions, destructuring of constants;
        * using json file for data.
     c. Fix App.js BrowserRouter warning (custom history). 
     d. Optimize constants.
     e. Move functions to utilities.
     f. Destructuring of constants & formatting code

14. Refactoring styles:
    a. Use variables for colors
    b. Transfer styles from sass to scss
    c. Use $breakpoints, use mixins

15. Layout How It Works page
    * Use dangerouslySetInnerHTML for rendering data;

16. Layout Events page  

17. Layout Buttons Group component   


**Back-end**
    
18. Created message.mongodb file with request to DB to find and count words "паровоз" in collection Message using aggregate ( try through MongoDB) 

19. Developed SQL data base structure (PostgreSQL) for chats;
    а. создана тестовая таблица для юзеров используя CREATE TABLE
    б. создана таблица "conversations" и для реализации m:n создана таблица "users_to_conversations" которая ссылается на id пользователя из тестовой таблицы юзеров и на id таблицы "conversations" и создан PRIMARY KEY ("user_id","conversation_id" ) -- реализуется возможность существования юзера в одном и больше чатов.
    с. создана таблица "messages" с FOREIGN KEY ("sender_id", "conversation_id") REFERENCES "users_to_conversations"("user_id", "conversation_id") где ссылается на таблицу "users_to_conversations" в разговоре которого точно будет этот пользователь(исключается вариант отправки сообщения пользователем в разговор, где пользователь никогда не находился).
    д. создана таблица "catalogs" с айдишкой владельца ("user_id"), ссылающейся на таблицу юзеров. и создана таблица "conversations_to_catalogs" где ключ реализует возможность нахождения в одном каталоге один и более чатов, и так же нахождение одного чата в разных каталогах.

20. Count users by role (9 task)  
21. 10% cashback for customers 
22. 10$ to top 3 creators by rating  

23. Create an errors logger and use middleware ( but now there is a cors errors in console and idk how to fix it :| )

24. Create a daily logger

25. Develop moderator role for application: 
    a. create moderatorDashboard;
    b. create offer box for moderator;
    c. create moderator store, routes, controllers for get offers from db, update their status by moderator.
    d. throw seed with moderator.
    e. use lib nodemailer for sending e-mail from moderator to user who created offer with moder`s decision.

26. Refactor models and migrations with sequelize + fix db
27. Fix chat

28. Transferring chats from no-sql db to sql db:
    * use ORM sequalize for models and migrations for messages, conversation and catalogs tables;
    * changed controllers for requests to db;  

29. Fix styles and group components;    