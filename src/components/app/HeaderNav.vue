<template>
  <header>
    <div class="header__container">
      <div class="header__logo">
        <router-link to="/">LOGO</router-link>
      </div>

      <div class="header__menu" :class="{active:mobileMenu}">
        <router-link v-for="item in menu" :key="item.id"
                     :to=item.path>{{ item.title }}
        </router-link>
      </div>

      <div class="header__sign-wrap" @click="popupMenu = !popupMenu">
        <div class="header__sign-title">
          <button>
            <a href="#">Пользователь</a>
            <img src="img/icon/bxs-user-circle2.svg">
          </button>
        </div>
        <div class="header__sign-popup" :class="{'open-popup': popupMenu}">
          <router-link v-for="item in popupmenuList" :key="item.id"
                       :to=item.path
                       :class="{'red' : item.path === '/signout'}">
            {{ item.title }}
          </router-link>
        </div>
      </div>

      <div class="header__burger-wrap">
        <div class="header__burger " :class="{active:mobileMenu}" @click="mobileMenu = !mobileMenu">
          <span></span>
        </div>
      </div>
    </div>
    <div class="popup-modal" v-if="popupMenu" @click="popupMenu = !popupMenu"></div>
  </header>
</template>

<script setup>
import {ref} from "vue";

const menu = [
  {id: 0, path: '/', title: 'Главная'},
  {id: 1, path: '/tasks', title: 'Задания'},
  {id: 2, path: '/dictionary', title: 'Словарь'},
  {id: 3, path: '/progress', title: 'Прогресс'},
  {id: 4, path: '/tariff', title: 'Тариф'},
];

const popupmenuList = [
  {id: 0, path: '/progress', title: 'Прогресс'},
  {id: 1, path: '/tariff', title: 'Тириф'},
  {id: 2, path: '/dictionary', title: 'Словарь'},
  {id: 3, path: '/payment', title: 'Платежи'},
  {id: 4, path: '/callback', title: 'Обратная связь'},
  {id: 5, path: '/signout', title: 'Выйти'},
];

let mobileMenu = ref(false);
let popupMenu = ref(false);
</script>

<style scoped lang="scss">
header {
  width: 100vw;
  height: 82px;
  background-color: var(--green);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 99;

  .header__container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 40px;

    a {
      font-size: 15px;
      font-weight: 600;
      -webkit-transition: text-shadow .3s;
      transition: text-shadow .3s;
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    .header__logo {
      a {
        font-size: 40px;
        font-family: Lilita One;
      }
    }

    .header__menu {
      display: flex;
      gap: 50px;
      margin: 0 10px;

      a {
        background-color: var(--red);
        padding: 7px;
        border-radius: 8px;
        border: 1px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        transition: all 0.2s;

        &:hover {
          color: var(--dark);
        }

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(5px);
        }
      }
    }

    .header__sign-wrap {
      position: relative;
      width: 310px;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        background-color: #9747ff
      }

      .header__sign-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        width: 100%;
        height: 100%;
        background-color: var(--green);
        z-index: 103;

        button {
          width: 220px;
          height: 55%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background-color: var(--yellow);
          border: 1px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          border-radius: 8px;
          transition: all 0.2s;

          &:active {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
          }

          a {
            color: var(--dark);
          }
        }
      }

      .header__sign-popup {
        position: absolute;
        top: -300%;
        width: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 0 0 8px 8px;
        background-color: #ffd073;
        overflow: hidden;
        z-index: 102;
        transition: all 0.2s;
        border: 1px solid var(--dark);

        a {
          color: #201f26;
          padding: 10px 20px;
          border-bottom: 1px solid #4f3dca45;
          transition: all 0.2s;

          &:hover {
            text-decoration: none;
            background-color: var(--blue);
            color: var(--white);
          }

          &.router-link-active {
            color: #bc32fc;
          }
        }
      }

      .open-popup {
        top: 100%;
      }
    }

    .header__burger-wrap {
      display: none;

      .header__burger {

      }
    }
  }
}

@media screen and (max-width: 1000px) {
  header {
    .header__container {

      a {
        font-size: 13px;
      }

      .header__logo {
        a {
        }
      }

      .header__menu {
        gap: 20px;

        a {
        }
      }

      .header__sign-wrap {
        width: 170px;

        .header__sign-title {

        }

        .header__sign-popup {
          width: 170px;
          height: 240px;

          a {
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  header {

    .header__container {

      a {
      }

      .header__logo {
        a {
        }
      }

      .header__menu {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        height: calc(100vh - 82px);
        left: 0;
        top: 100%;
        background-color: #9747ff;
        overflow: auto;
        transition: all 0.3s ease 0s;
        margin: unset;
        padding: 30px;

        a {
          font-size: 20px;
        }
      }

      .header__menu.active {
        top: 82px;
      }

      .header__sign-wrap {
        display: none;

        .header__sign-title {

        }

        .header__sign-popup {

          a {
          }
        }
      }

      .header__burger-wrap {
        display: block;
        width: 30px;
        height: 30px;

        .header__burger {
          display: block;
          position: relative;
          width: 30px;
          height: 20px;

          &-wrap {
            margin-left: auto;
          }

          span {
            content: '';
            background-color: #fff;
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            top: 9px;
            transition: all 0.3s ease 0s;
          }

          &:before,
          &:after {
            content: '';
            background-color: #fff;
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            transition: all 0.3s ease 0s;
          }

          &.active:before {
            transform: rotate(45deg);
            top: 9px;
          }

          &.active:after {
            transform: rotate(-45deg);
            bottom: 9px;
          }

          &.active span {
            transform: scale(0);
          }

          &:before {
            top: 0
          }

          &:after {
            bottom: 0;
          }
        }

        .header__menu {
          position: fixed;
          width: 100%;
          left: 0;
          bottom: 100%;
          background-color: red;
          overflow: auto;
          transition: all 0.3s ease 0s;
        }

        .header__menu.active {
          bottom: 0;
        }
      }
    }
  }
}

</style>
