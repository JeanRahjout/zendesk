<template>
    <div class="main-sso">
        <h1><a href="https://support.zendesk.com/hc/en-us/articles/4408845838874-Enabling-JWT-single-sign-on" target="_blank">JWT SSO</a></h1>
            <div>
                <div class="main-att">
                    <span>
                            <h3><a href="https://support.zendesk.com/hc/en-us/articles/4408845838874-Enabling-JWT-single-sign-on#ariaid-title14" target="_blank">Payload of Data</a></h3>
                        </span>
                            <label for="external_id">External_id</label><br>
                            <input type="text" id="external_id" name="external_id" v-model="jwt.External_id" @click="clearInput(this.jwt.External_id)"><br>
                            <label for="fname">Enter name</label><br>
                            <input type="text" id="name" name="name" v-model="jwt.name" @click="clearInput(this.jwt.name)"><br>
                            <label for="email">Enter email</label><br>
                            <input type="email" id="email" name="email" v-model="jwt.email" @click="clearInput(this.jwt.email)"><br>
                            <!-- 
                            <label for="validity_time">Clock skew</label><br>
                            <select id="validity_time" name="time" v-model="this.jwt.select"><br>
                                <option value="zero">0 min</option>
                                <option value="three">3 min</option>
                            </select> 
                            -->
                </div>
                <div class="main-secret">
                    <hr>
                        <span>
                            <h3><a href="https://support.zendesk.com/hc/en-us/articles/4408845838874-Enabling-JWT-single-sign-on#ariaid-title8" target="_blank">Shared Secret</a></h3>
                        </span>
                            <label for="secret">Enter Secret</label><br>
                            <input type="text" id="secret" name="secret" size="60" v-model="jwt.secret" @click="clearInput(this.jwt.secret)">
                    <br>
                </div>
                <div class="submit">
                    <input type="button" value="Generate" v-model="btn_generate" v-on:click="sendJWT()">
                </div>
                <div class="response" v-if="responseJwt === true">
                    <resJwt :resData="resData" />
                </div>
            </div>
    </div>
</template>
<script>
import axios from 'axios';
import Toggle from './Toggle.vue'
import resJwt from './resJwt.vue'

export default {
    name: "Sso_jwt",
    'Toggle': Toggle,
    components: {
        resJwt
    },
    data() {
        return {
            jwt: { 
                External_id: '12345678',
                name: 'Jane Soap',
                email: 'janes@soap.com',
                secret: 'oSKnCUM7Rxd7Tq1SSz8SKEartMAe5Ab3JmYdG6GOU1Y12WMJ',
                select: ''
            },
            url: 'api/jwt_sso',
            responseJwt: false,
            resData: {},
            btn_generate: 'Generate',
            missingAtt: ''
        }
    },
    methods: {
        clearInput(arg){
            switch(arg) {
                case (arg = this.jwt.email):
                    this.jwt.email = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.External_id):
                    this.jwt.External_id = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.name):
                    this.jwt.name = '';
                    this.missingAtt = ''
                    break;
                case (arg = this.jwt.secret):
                    this.jwt.secret = '';
                    this.missingAtt = ''
                    break;
                default:
                }
        },
        sendJWT() {
            if (this.jwt.name != "" && this.jwt.email != "" && this.jwt.secret != "") {
                axios({
                        method: 'post',
                        url: this.url,
                        withCredentials: false,
                        params: {
                            external_id: this.jwt.External_id,
                            name: this.jwt.name,
                            email: this.jwt.email,
                            validity_token: this.select,
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
.main-att {
    padding-top: 5px !important;
    padding-bottom: 3px;
}
.main.secret {
    padding-top: 5px !important;
    padding-bottom: 3px;
}
input, select {
    margin-bottom: 10px;
    text-align: center;
}
h3 {
    font-size: 18px;
}
.submit {
    margin-top: 10px;
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
</style>