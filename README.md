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
