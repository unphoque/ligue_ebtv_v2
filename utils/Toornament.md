# toornament.js
Afin de faciliter la communication avec l'api Toornament (#1.2 et #1.3 sur le trello), j'ai mis en place le fichier toornament.js

# Exemple
```javascript
const toornament = require('./utils/toornament');
const c = new toornament("tokenRequest" || null, "tokenParticipant" || null, "apiKey");

// Requête PATCH sur /matches/{id}
c.patch("matches/insererunidici", {
    body: {
        public_note: "Hello world!",
        private_note: "hi"        
    }   
}, (error, result) => {
    if (error) throw error;
    console.log(result)
})
```