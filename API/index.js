const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

app.use( express.json() );

app.get('/camiseta', (req, res) => {
    res.status(200).send({
        camiseta: 'Branca',
        tamanho: 'Grande'
    })
});

app.post('/camiseta/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo){
        res.status(418).send({message: 'We need a logo!'})
    }

   res.send({
       camiseta: `branca com a sua ${logo} e ID de ${id}`,
   })
});

app.put();

app.delete();