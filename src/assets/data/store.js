// store.js
import { reactive } from "vue";

export const store = reactive({
  apiKey: "RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa",
  playersUrls: {
    GameDataByMatchId: "https://europe.api.riotgames.com/lol/match/v5/matches/",
    //^^dopo lo slash ci va l'id del match^^
    matchIdByPlayerPUUID:
      "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/",
    //^^dopo lo slash ci va il PUUID qui come params oltre alla key ci va da dove vuoi partire (start) e quanti match si vuole (count)^^
    summonerData:
      "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/",
    //^^dopo lo slash ci va il nome in game, e restituisce id (che è l'encrypted summoner id), il PUUID, il livello e l'immagine profilo^^
    profilePicUrl:
      "https://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/" /*+ iconId + .png*/,
  },
  ChampionsUrls: {
    allChamps:
      "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
    //^^Restituisce tutti i Champ con alcune specifiche per ognuno^^
    specificChamp:
      "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/" /*+ nomeChamp + .json*/,
    //^^Restituisce le info di un Champ specificato per nome^^
    champImage:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" /*+ nomeChamp_0 + .jpg*/,
    //^^restituisce l'immagine di un champ cercato per nome^^
  },
});
