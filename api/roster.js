
export default async function handler(request, res) {

    const roster = [
    
        {
          "characterImage": "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg",
          "title": "Pikachu",
          "subtitle": "The Mouse Pokémon",
          "bio": "Pikachu, the Mouse Pokémon. It can generate electric attacks from  the electric pouches located in both of its cheeks.",
          "topText": "When you forgot to do the weekly assignments",
          "bottomText": "So you have to do it in the last minute"
        },
        {
          "characterImage": "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg",
          "title": "Pikachu",
          "subtitle": "The Mouse Pokémon",
          "bio": "Pikachu, the Mouse Pokémon. It can generate electric attacks from  the electric pouches located in both of its cheeks.",
          "topText": "When you forgot to do the weekly assignments",
          "bottomText": "So you have to do it in the last minute"
        }
      ];
      
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.json(roster);
}