<script setup>
import { ref } from "vue";
import { NButton, NCard, NInput, NSpace, NRadio, NTag, NSwitch, NIcon } from 'naive-ui'
import { GlassesOutline, Glasses } from "@vicons/ionicons5";
import Swal from 'sweetalert2'
import { useIdentityStore } from '../stores/identityStore'
// import router from '../router/index'

const loginPassword = "han@6578279"
const enteredPassword = ref("")
const identityStore = useIdentityStore()
const comparePassword = (enteredPassword) => {
    if (loginPassword === enteredPassword) {
        identityStore.isAllowed = true
        Swal.fire(`OK, you're allowed`)
        // router.go('/data')
    } else {
        identityStore.isAllowed = false
        Swal.fire(`비밀번호 틀립니다!`)
    }
}


</script>

<template>
    <div class="my">
        <n-card title="Staff Only">
            <n-space vertical>
                <n-input v-model:value="enteredPassword" type="password" show-password-on="mousedown"
                    placeholder="비밀번호 입력하세요" :maxlength="11" />
                <n-button tertiary type="success" round block @click="comparePassword(enteredPassword)">Login</n-button>
            </n-space>
        </n-card>
    </div>
</template>

<style scoped>
.n-card {
    max-width: 300px;
}

.my {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>