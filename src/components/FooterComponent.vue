<template>
  <div class="container py-2">
    <!-- Start Hyperlinks area -->
    <div class="row justify-content-center py-2 pb-4">
      <div class="col-6">
        <ul class="d-flex align-items-center justify-content-center m-0 p-0">
          <li
            v-for="(el, id) in hyperlinks"
            :key="id"
            class="hyper-cont"
            :class="el.class"
          >
            <a href=""><i :class="el.fa"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <!-- End Hyperlinks area -->
    <!-- Start Brand copyright area -->
    <div class="row flex-column align-items-center justify-content-center g-3">
      <div class="col-6 text-center">
        <div class="logo-cont">
          <a href="">
            <img src="" alt="Logo" />
          </a>
        </div>
      </div>
      <div class="col-6 text-center">
        <p class="txt-copyright m-0">{{ copyright }}</p>
      </div>
    </div>
    <!-- End Brand copyright area -->
    <!-- Start PEGI area -->
    <div class="row py-2">
      <div class="col-12 text-center">
        <a v-for="(el, id) in pegi" :key="id" class="pegi-area" :href="el.link"
          ><img :src="el.img" alt=""
        /></a>
      </div>
    </div>
    <!-- End PEGI area -->
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      hyperlinks: [
        {
          hyperId: 1,
          name: "Instagram",
          fa: "fa-brands fa-instagram",
          class: "instagram",
        },
        {
          hyperId: 2,
          name: "Youtube",
          fa: "fa-brands fa-youtube",
          class: "youtube",
        },
        {
          hyperId: 3,
          name: "Twitter",
          fa: "fa-brands fa-x-twitter",
          class: "twitter",
        },
        {
          hyperId: 4,
          name: "Facebook",
          fa: "fa-brands fa-facebook",
          class: "facebook",
        },
      ],
      copyright:
        "™ &amp; © 2023 Riot Games, Inc.  League of Legends and all related logos, characters, names and distinctive likenesses thereof are exclusive property of Riot Games, Inc.  All Rights Reserved.",
      pegi: [
        {
          pegiId: 1,
          name: "PEGI 12",
          img: "https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt5183333a33f60552/5e855702d2b50e545115eb26/pegi-eu.png?&amp;height=100&amp;disable=upscale",
          link: "https://pegi.info/",
        },
        {
          pegiId: 2,
          name: "USK 12",
          img: "https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt968ee09c83b8f93d/5e855258b01b81301599af3b/usk-12.png?&amp;height=100&amp;disable=upscale",
          link: "https://usk.de/en/",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
div {
  .hyper-cont {
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 5px;
    border: 1px solid black;
    text-align: center;
    border-radius: 35%;
  }
  .instagram {
    transition: all 0.4s ease;
    &:hover {
      background-color: lightcoral;
      color: yellow;
    }
  }
  .twitter {
    transition: all 0.4s ease;
    &:hover {
      background-color: black;
      color: white;
    }
  }
  .youtube {
    transition: all 0.4s ease;
    &:hover {
      background-color: white;
      color: red;
    }
  }
  .facebook {
    transition: all 0.4s ease;
    &:hover {
      background-color: white;
      color: blue;
    }
  }
  .txt-copyright {
    font-size: 0.8em;
  }
  .pegi-area {
    margin: 0 2px;

    img {
      border-radius: 15%;
      padding: 10px 15px;
      background-color: rgba(0, 0, 0, 0.308);
    }
  }
}
</style>
