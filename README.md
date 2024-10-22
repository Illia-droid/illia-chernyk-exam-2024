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