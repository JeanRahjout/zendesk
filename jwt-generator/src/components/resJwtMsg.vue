<template>
    <div class="main-res">
        <div class="token_iat">
            <div>Your Token was issued at : <b>{{ resData.issued_at }}</b></div>
            <div style="font-size: 14px; color: green !important;"><span class="material-symbols-outlined validIcon">task_alt</span><i> Valid until : <b>{{ resData.valid_until }}</b></i></div>
        </div>
        <div class="token">
            <div><b>Your JWT is</b></div>
            <div class="main-jwt"><code>{{ resData.jwt }}</code></div>
        </div>
        <div class="payload">
            <div><b>Your payload is</b></div>
            <div class="main-payload"><pre><code>{{ resData.payload }}</code></pre></div>
        </div>
        <div class="secret-res">
            <div><b>Your secret is</b></div>
            <div class="main-secret-res"><code>{{ resData.secret }}</code></div>
        </div>
    </div>
</template>
<script scoped>
import Toggle from './Toggle.vue'

export default {
    name: "restJwtMsg",
    'Toggle': Toggle,
    data() {
        return {
        }
    },
    props: {
        resData: {}
    }
}
</script>
<style>
.main-res {
    background-color: #ccd6d8;
    width: 60%;
    margin: auto;
    padding-bottom: 5px;
    padding-top: 15px;
    margin-bottom: 25px;
}
.token {
    margin: auto;
    vertical-align: middle;
    text-align: center;
    overflow-wrap: break-word;
    width: 60%;
    margin-bottom: 15px;
}
.secret-res {
    margin: auto;
    vertical-align: middle;
    text-align: center;
    overflow-wrap: break-word;
    width: 30%;
    margin-bottom: 15px;
}
.payload {
    margin: auto;
    vertical-align: middle;
    text-align: center;
    overflow-wrap: break-word;
    width: 40%;
    margin-bottom: 15px;
}
.token_iat {
    margin: auto;
    vertical-align: middle;
    text-align: center;
    overflow-wrap: break-word;
    margin-bottom: 15px;
    font-size: 20px;
    color: #00363d !important;
}
.main-jwt {
    background-color: #ededed !important;
    padding: 10px;
    border: dashed 0.5px;
}
.main-payload 
{
    background-color: #ededed !important;
    padding: 5px;
    border: dashed 0.5px;
}
.main-secret-res
{
    background-color: #ededed !important;
    padding: 5px !important;
    border: dashed 0.5px;
}
.validIcon {
    font-size: 14px !important;
    line-height: 24px;
    vertical-align: middle !important;
}
</style>