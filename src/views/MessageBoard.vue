<script setup>
import { onMounted, ref, render } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { NButton, NCard, NInput, NSpace, NRadio, NTag, NSwitch, NIcon } from 'naive-ui'
import Swal from 'sweetalert2'
import { CommentsDollar, Tablets, Fax, ChartBarRegular, UserCheck, CommentDotsRegular } from '@vicons/fa'

//kakao scripts start from here
const kakaoLogin = () => {
    Kakao.Auth.authorize({
        redirectUri: 'http://calldoc.co.kr:5173/data',
        throughTalk: true,
        scope: 'friends, talk_message'
    })
}

const kakaoLogOut = () => {
    Kakao.Auth.logout()
        .then((resp) => {
            Swal.fire(`로그아웃!`)
            console.log(Kakao.Auth.getAccessToken())
        })
        .catch((err) => {
            console.log('not logged in')
        })
}


const authCode = location.search.substring(6)
const access_token = ref('')
const kakaOptions = {
    'grant_type': 'authorization_code',
    'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',
    'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',
    'code': authCode,
    'redirect_uri': 'http://calldoc.co.kr:5173/data'
}

onMounted(async () => {
    await axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: qs.stringify(kakaOptions),
        url: 'https://kauth.kakao.com/oauth/token'
    })
        .then((response) => {
            Kakao.Auth.setAccessToken(response.data.access_token)
            access_token.value = Kakao.Auth.getAccessToken()
            console.log(`access_token : ${access_token.value}`)
        })
        .catch((err) => {
        })
})

//수납금액
const cost = ref()
const shareMsgInfo = (cost) => {
    Kakao.Share.sendCustom({
        templateId: 85061,
        templateArgs: {
            COST: cost
        }
    });
}

//처방전 전송
const shareMsgPharm = () => {
    Kakao.Share.sendCustom({
        templateId: 85349
    });
}

//검사결과 알림
const sharelab = () => {
    Kakao.Share.sendCustom({
        templateId: 92230
    });
}

//팩스 이메일 전송
const picked = ref("")
const checkedValue = ref(null)
const handleChange = (e) => {
    checkedValue.value = e.target.value
    picked.value = checkedValue.value
}
const shareFaxEmail = (picked) => {
    Kakao.Share.sendCustom({
        templateId: 92231,
        templateArgs: {
            WAY: picked
        }
    });
}

//메모 보내기
const name = ref("")
const memo = ref("")
const shareMemo = (name, memo) => {
    Kakao.Share.sendCustom({
        templateId: 92233,
        templateArgs: {
            NAME: name,
            MEMO: memo
        }
    });
}

</script>

<template>
    <div class="features">
        
            <div class="feature-item">
                <article>
                <n-icon size="30"><user-check /></n-icon>
                카톡 사용자
                <n-button tertiary round type="success" v-if="!access_token" @click="kakaoLogin">카카오로그인</n-button>
                <n-button tertiary round type="error" v-if="access_token" @click="kakaoLogOut">카카오로그아웃</n-button>
                </article>
            </div>

            <div class="feature-item">
                <article>
                <n-icon size="30"><comments-dollar /></n-icon>
                수납안내
                <n-input round v-model:value="cost" placeholder="요청금액">
                    <template #suffix>원</template>
                </n-input>
                <n-button @click="shareMsgInfo(cost)">알림톡</n-button>
                </article>
            </div>

            <div class="feature-item">
                <article>
                <n-icon size="30"><comment-dots-regular /></n-icon>
                문자 전송
                <n-space item-style="display: flex;" align="start" vertical>
                    이름<n-input v-model:value="name" type="text" placeholder="이름" />
                    메모<n-input maxlength="200" show-count v-model:value="memo" type="textarea" placeholder="내용" />
                </n-space>
                <n-button @click="shareMemo(name, memo)">알림톡</n-button>
                </article>
            </div>

            <div class="feature-item">
                <article>
                <n-icon size="30"><tablets /></n-icon>
                마트약국
                <n-button @click="shareMsgPharm">알림톡</n-button>
                </article>
            </div>

            <div class="feature-item">
                <article>
                <n-icon size="30"><fax /></n-icon>
                처방전 전송
                <n-space item-style="display: flex;" align="center">
                    <n-radio :checked="checkedValue === 'email'" value="email" @change="handleChange">이메일</n-radio>
                    <n-radio :checked="checkedValue === 'fax'" value="fax" @change="handleChange">팩스</n-radio>
                    <n-button @click="shareFaxEmail(picked)">알림톡</n-button>
                </n-space>
                </article>
            </div>

            <div class="feature-item">
                <article>
                <n-icon size="30"><chart-bar-regular /></n-icon>
                검사결과 안내
                <n-button @click="sharelab">알림톡</n-button>
                </article>
            </div>


        
    </div>
</template>

<style>

.main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;

}

/* .div {
    max-width: 200px;
    display: inline-flex;
} */

.features {
    display: flex;
    flex-wrap: wrap;
    margin: -6px;
  
    .feature-item {
      width: 33.33%;
      box-sizing: border-box;
      padding: 6px;
    }
  
    article {
      background-color: rgba(84, 86, 87, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 12px;
      height: 100%;
    
    }
  
    span {
      color: #12a2d6;
      word-break: break-all;
    }
  
    .title {
      font-size: 17px;
      font-weight: 500;
      color: #0a3f1e;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  
    .detail {
      font-size: 11px;
      font-weight: 500;
      line-height: 22px;
      margin-top: 6px;
    }
  }
</style>

