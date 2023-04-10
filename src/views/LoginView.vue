<script setup>
import { ref } from "vue";
import { NButton, NCard, NInput, NSpace, NRadio, NTag, NSwitch, NIcon } from 'naive-ui'
import { GlassesOutline, Glasses } from "@vicons/ionicons5";

const loginPassword = "han@6578279"
const enteredPassword = ref("")


</script>

<template>
    <div class="my">
        <n-card title="Staff Only">
            <n-space vertical>
                <n-input v-model:value="enteredPassword" type="password" show-password-on="mousedown"
                    placeholder="비밀번호 입력하세요" :maxlength="8" />
                <n-button tertiary type="success" round block @click="">Login</n-button>
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