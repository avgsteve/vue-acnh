<template>
  <Section :props_title="prop_accountData.nickName" :props_subtitle="''">
    <div>
      <div class="headerContainer">
        <div class="header-bg" :style="computed_coverImagedStyle"> </div>
        <div class="profile-img">
          <img :src="prop_accountData.profilePic" alt="" srcset="" />
        </div>
        <div class="header-bg blank"></div>
      </div>

      <div class="accountDetailContainer"> </div>
    </div>
  </Section>
</template>
<script>
import { defineComponent } from 'vue'
import Section from './../../../src/pages/LAYOUT/sectionComponent.vue'
export default defineComponent({
  name: 'Account',
  components: {
    Section
  },
  setup: () => {},
  props: {
    prop_accountData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataObj: null,
      data_isLoading: true,
      userData: {
        _id: {
          $oid: '60846e05de5acd392cd11aa8'
        },
        nickName: 'Steve',
        oauthAccounts: {
          google: {
            registered: true,
            email: 'steve.leng@gmail.com',
            picture:
              'https://lh3.googleusercontent.com/a-/AOh14GhJw9Xlcwt5u4Gl6PnA0ocd0XO6sSJB3mASxXBTl9I=s96-c',
            name: 'Steve Leng'
          },
          facebook: {
            registered: false
          }
        },
        friends: [],
        villagers: [],
        hasSetPassword: false,
        list: [],
        following: [],
        followers: [],
        profilePic: '/src/assets/img/characters/Blathers.png',
        coverPhoto: '/src/assets/img/background/coverPhoto.jpg',
        role: 'user',
        email: 'steve.leng@gmail.com',
        createdAt: {
          $date: '2021-04-24T19:14:13.644Z'
        },
        updatedAt: {
          $date: '2021-04-24T19:14:13.644Z'
        },
        __v: 0
      }
    }
  },
  computed: {
    computed_coverImagedStyle() {
      return {
        backgroundImage: `url(${this.prop_accountData.coverPhoto})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.headerContainer {
  position: relative;
}

.header-bg {
  height: 6rem;
  overflow: hidden;
}

.header-bg.blank {
  background-color: white;
}

.header-bg img {
  width: 100%;
}

.profile-img {
  position: absolute;
  border-radius: 50%;

  left: 25%;
  transform: translateX(-50%);
  top: 25%;
  width: 8rem;
}

.profile-img img {
  width: 100%;
  background-color: rgb(179, 210, 245);
  border-radius: 50%;
  border: 5px solid rgb(255, 255, 255);
  padding: 0 0.5rem;
}
</style>