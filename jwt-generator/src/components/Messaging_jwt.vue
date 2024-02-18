<template>
    <div class="messaging-sso">
        <h1><a href="https://support.zendesk.com/hc/en-us/articles/4411666638746-Authenticating-end-users-in-messaging-for-the-Web-Widget-and-mobile-SDK" target="_blank">JWT Messaging</a></h1>
            <div>
                <div class="main-header">
                        <span>
                            <h3><a href="https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/web/enabling_auth_visitors/?_ga=2.163277628.1089645146.1708198345-705589116.1708198345&_gl=1*1ycie4a*_ga*NzA1NTg5MTE2LjE3MDgxOTgzNDU.*_ga_0G6FC9CS2V*MTcwODE5ODM0NC4xLjEuMTcwODE5ODM1Mi41Mi4wLjA.#generating-a-signing-key" target="_blank">Header</a></h3>
                        </span>
                            <label for="kid">Enter KID</label><br>
                            <input type="text" id="kid" name="kid" v-model="jwt.kid"  @input="jwt.kid" @click="clearInput(this.jwt.kid)">
                </div>
                <div class="main-att">
                    <hr>
                        <span>
                            <h3><a href="https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/web/enabling_auth_visitors/?_ga=2.163277628.1089645146.1708198345-705589116.1708198345&_gl=1*1ycie4a*_ga*NzA1NTg5MTE2LjE3MDgxOTgzNDU.*_ga_0G6FC9CS2V*MTcwODE5ODM0NC4xLjEuMTcwODE5ODM1Mi41Mi4wLjA.#creating-a-jwt-token" target="_blank">Payload of Data</a></h3>
                        </span>
                        <label for="external_id">External_id</label><br>
                            <input type="text" id="external_id" name="external_id" v-model="jwt.External_id" @click="clearInput(this.jwt.External_id)"><br>
                            <label for="fname">Enter name <span class="optio">(Optional)</span></label><br>
                            <input type="text" id="name" name="name" v-model="jwt.name"  @click="clearInput(this.jwt.name)"><br>
                            <label for="email">Enter email <span class="optio">(Optional)</span></label><br>
                            <input type="text" id="email" name="email" value="janes@soap.com" v-model="jwt.email" @click="clearInput(this.jwt.email)"><br>
                            <label for="email_verified">Email verified? <span class="optio">(Optional)</span></label><br>
                            <select id="email_verified" name="verify" v-model="jwt.email_verified">
                                <option value='true'>yes</option>
                                <option value='false'>no</option>
                            </select><br>
                            <label for="validity_time">Validity token</label><br>
                            <select id="validity_time" name="time" v-model="jwt.select">
                                <option value="five" selected>5 min</option>
                                <option value="ten">10 min</option>
                                <option value="fifteen">15 min</option>
                                <option value="twenty">20 min</option>
                            </select>
                </div>
                <div class="main-secret">
                        <hr>
                        <span>
                            <h3><a href="https://support.zendesk.com/hc/en-us/articles/4411666638746-Authenticating-end-users-in-messaging-for-the-Web-Widget-and-mobile-SDK#topic_pyg_kqx_3sb" target="_blank">Shared Secret</a></h3>
                        </span>
                            <label for="secret">Enter Secret</label><br>
                            <input type="text" id="secret" name="secret" size="60" v-model="jwt.secret" @click="clearInput(this.jwt.secret)">
                            <br>
                </div>
                <div class="submit">
                    <input type="button" value="Generate" v-model="btn_generate" v-on:click="sendJWT_msg()">
                </div>
                <div class="response" v-if="responseJwt === true">
                    <resJwtMsg :resData="resData" />
                </div>
            </div>
    </div>
</template>
<script scoped>
import Toggle from './Toggle.vue'
import axios from 'axios'
import resJwtMsg from './resJwtMsg.vue'

export default {
    name: "Messaging_jwt",
    'Toggle': Toggle,
    data() {
        return {
            jwt: {
                kid: 'app_622f9522c0cf6000f32203f2',
                External_id: '12345678',
                name: 'Jane Soap',
                email: 'janes@soap.com',
                email_verified: false,
                select: 'five',
                secret: 'oSKnCUM7Rxd7Tq1SSz8SKEartMAe5Ab3JmYdG6GOU1Y12WMJ'
            },
            url: 'api/jwt_messaging',
            responseJwt: false,
            resData: {},
            btn_generate: 'Generate',
            missingAtt: ''
        }
    },
    components: {
        resJwtMsg
    },
    methods: {
        clearInput(arg){
            switch(arg) {
                case (arg = this.jwt.secret):
                    this.jwt.secret = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.External_id):
                    this.jwt.External_id = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.kid):
                    this.jwt.kid = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.email):
                    this.jwt.email = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.name):
                    this.jwt.name = '';
                    this.missingAtt = ''
                    break;
                default:
                }
        },
        sendJWT_msg(){
            if (this.jwt.External_id != "" && this.jwt.secret != "" && this.jwt.kid != "") {
                console.log(this.jwt.External_id)
                axios({
                        method: 'post',
                        url: this.url,
                        withCredentials: false,
                        params: {
                            kid: this.jwt.kid,
                            external_id: this.jwt.External_id,
                            name: this.jwt.name,
                            email: this.jwt.email,
                            verified: this.jwt.email_verified,
                            validity_token: this.jwt.select,
                            secret: this.jwt.secret
                        },
                    })
                        .then((response) => {
                            console.log(response.data)
                            this.responseJwt = true;
                            this.resData = response.data
                            setTimeout(() => {
                                window.scrollTo(0, document.body.scrollHeight);
                            }, 0);
                            this.btn_generate = 'Generate again'
                        })
                        .catch((error) => {
                            console.log(error)
                            this.responseJwt = false;
                        })
            }
            else {
                // let attEmpty = this.missingAtt
                alert("Required Attribute missing!");
            }
        }
    }
}
</script>
<style>
@media (max-width: 768px) {
    .main-header, .main-att, .main-secret {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #e5eaeb;
    vertical-align: middle;
    width: 100% !important;
    margin: auto;
}
.main-header, .main-att, .main-secret {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #e5eaeb;
    vertical-align: middle;
    width: 100% !important;
    margin: auto;
    font-size: 16px;
}
}
.main-header, .main-att, .main-secret {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #e5eaeb;
    vertical-align: middle;
    width: 60%;
    margin: auto;
    font-size: 16px;
}
.main-header {
    padding-top: 3px !important;
    padding-bottom: 5px;
}
.main-secret {
    padding-top: 3px !important;
    padding-bottom: 20px !important;
}
h3 {
    font-size: 18px;
}
input, select {
    margin-bottom: 10px;
    text-align: center;
}
.submit {
    margin-top: 15px;
    margin-bottom: 15px;
}
input[type=button] {
  background-color: #00363d;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
input[type=button]:hover {
  background-color: #4c7277;
} 
a {
    color: #00363d;
}
a:link {
      text-decoration: none;
}

a:visited {
      text-decoration: none;
}

a:hover {
      text-decoration: none;
}

a:active {
      text-decoration: none;
}
.optio {
    font-style: italic;
    font-weight: bold;
    font-size: 12px;
    color: black;
}
</style>