// store.js
import { reactive } from "vue";

export const store = reactive({
  apiKey: "RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa",

  playersUrls: {
    GameDataByMatchId: "https://europe.api.riotgames.com/lol/match/v5/matches/",
    //^^dopo lo slash ci va l'id del match e la api_key^^
    //es https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6738168682?api_key=RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa
    matchIdByPlayerPUUID:
      "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/",
    //^^dopo lo slash ci va il PUUID, qui come params oltre alla key ci va da dove vuoi partire (start) e quanti match si vuole (count)^^
    //es https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/Mq8LTtJH_VBkHVMAgOGXIsZqNEe5dYQ4qeZ9xIs6OCB2Gi0QoOnnLBEVnHAxowyw5EhOVZyNawIURA/ids?start=0&count=20&api_key=RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa
    summonerData:
      "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/",
    //^^dopo lo slash ci va il nome in game e restituisce id (che è l'encrypted summoner id), il PUUID, il livello e l'immagine profilo^^
    //es https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Prædathor?api_key=RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa
    profilePicUrl:
      "https://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/" /*+ iconId + .png*/,

    championMastery:
      "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/",
    //^^dopo lo slash ci va il PUUID^^
    //es https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/Mq8LTtJH_VBkHVMAgOGXIsZqNEe5dYQ4qeZ9xIs6OCB2Gi0QoOnnLBEVnHAxowyw5EhOVZyNawIURA?api_key=RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa
    summonerRank:
      "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/",
    //^^dopo lo slash ci va l'encrypted summoner id^^
    // es https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/53VCVCEPaWpA6BMxXiHxPqe0sXfrxf40DtfvZ93KzMUnMaI?api_key=RGAPI-3e9408fd-0a93-4011-be37-2961623a36fa
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
    champIcon:
      "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/" /*+ nomeChamp + .png*/,
    //^^restituisce l'icon di un champ cercato per nome^^
    //es https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Hwei.png
  },
  //nelle chiamate per i champs non serve la api key

  spells: {
    21: { key: "SummonerBarrier", name: "Barrier" },
    1: { key: "SummonerBoost", name: "Cleanse" },
    2202: { key: "SummonerCherryFlash", name: "Flash" },
    2201: { key: "SummonerCherryHold", name: "Flee" },
    14: { key: "SummonerDot", name: "Ignite" },
    3: { key: "SummonerExhaust", name: "Exhaust" },
    4: { key: "SummonerFlash", name: "Flash" },
    6: { key: "SummonerHaste", name: "Ghost" },
    7: { key: "SummonerHeal", name: "Heal" },
    11: { key: "SummonerSmite", name: "Smite" },
    12: { key: "SummonerTeleport", name: "Teleport" },
    13: { key: "SummonerMana", name: "Clarity" },
    30: { key: "SummonerPoroRecall", name: "To the King!" },
    31: { key: "SummonerPoroThrow", name: "Poro Toss" },
    32: { key: "SummonerSnowball", name: "Mark" },
    39: { key: "SummonerSnowURFSnowball_Mark", name: "Mark" },
    54: { key: "Summoner_UltBookPlaceholder", name: "Placeholder" },
    55: {
      key: "Summoner_UltBookSmite_Placeholder",
      name: "Placeholder and Attack-Smite",
    },
  },
  imageSpellUrl:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/" /*+ key + .png */,

  runeCathegoryImage:
    "https://cdn.lolrift.com/images/rrunes/splash/icon-" /*+ iniziale in minuscolo + -36x36.png*/,
  runeImages:
    "https://cdn.lolrift.com/images/rrunes/runes/domination/Predator_rune.png" /* + nome runa con l'iniziale in maiuscolo (se ha più parole si mette un _ in mezzo e tutte le parole con iniziale maiuscola) + _rune.png */,

  activeChamp: "",
});
