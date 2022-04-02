<template>
    <div class="mine-page">
        <div class="mine-page-title">
            全科e管理
        </div>
        <div class="mine-page-content">
            <van-cell-group>
                <van-cell
                    title="个人信息"
                    size="large"
                    is-link
                    icon="user-o"
                    @click="jumpUrl('/patients/personal-information')"
                />
                <van-cell
                    title="个人病例"
                    size="large"
                    is-link
                    icon="orders-o"
                    @click="jumpUrl('/patients/personal-cases')"
                />
                <van-cell
                    title="我的消息"
                    size="large"
                    is-link
                    icon="chat-o"
                    @click="jumpUrl('/patients/notice')"
                />
                <van-cell
                    title="定时提醒"
                    size="large"
                    is-link
                    icon="underway-o"
                    @click="jumpUrl('/patients/timed-reminders')"
                />
                <van-cell
                    title="清理缓存"
                    size="large"
                    is-link
                    icon="brush-o"
                    @click="clearCache"
                />
                <van-cell
                    size="large"
                    is-link
                    icon="info-o"
                    @click="openUpdateModal"
                >
                    <template #title>
                        <van-badge v-if="version.hasNewVersion" dot>
                            <span class="custom-title">系统更新</span>
                        </van-badge>
                        <span v-else class="custom-title">系统更新</span>
                    </template>
                </van-cell>
                <van-cell
                    title="删除账号"
                    size="large"
                    is-link
                    @click="show = true"
                    icon="delete-o"
                />
                <van-cell
                    title="退出登录"
                    size="large"
                    is-link
                    @click="logOut"
                    icon="revoke"
                />
            </van-cell-group>
        </div>
        <van-dialog
            v-model="show"
            title="删除账号"
            show-cancel-button
            className="deleteDialog"
            @confirm="deleteAccount"
        >
            <div class="box">
                <p>您的账号所有信息将被删除，删除的信息无法找回</p>
                <van-field
                    v-model="cardNum"
                    label="身份证号"
                    placeholder="请输入身份证号确认删除"
                />
            </div>
        </van-dialog>
        <TabBar type="patients" :nowKey="3"></TabBar>
    </div>
</template>

<script>
import { getPId } from '@/common/util.js';
import TabBar from '@/components/TabBar.vue';
import { Cell, CellGroup, Toast, Badge, Dialog, Field } from 'vant';
import { jsBridge } from '@/common/util.js';
export default {
    data() {
        return {
            pId: null,
            version: {
                hasNewVersion: false,
            },
            cardNum: null,
            show: false,
        };
    },
    mounted() {
        this.pId = getPId();
        this.getUpdate();
    },
    methods: {
        jumpUrl(url) {
            this.$router.push(url);
        },
        clearCache() {
            jsBridge.clearCache && jsBridge.clearCache();
            Toast('清除缓存成功');
        },
        logOut() {
            jsBridge.logOut && jsBridge.logOut();
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push('/login');
        },
        getUpdate() {
            const version =
                (jsBridge.getAppVersion && jsBridge.getAppVersion()) ||
                '100.9.9';
            this.$api
                .get(`/qkys/api/getAppUpdateInfo/Pa/${version}`)
                .then(res => {
                    const { data = {} } = res;
                    this.version = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        openUpdateModal() {
            if (this.version.hasNewVersion) {
                Dialog.confirm({
                    title: '检查更新',
                    message: `有新版本v${this.version.version} ${this.version.size} ${this.version.updateAppTime}`,
                    confirmButtonText: '下载',
                })
                    .then(() => {
                        window.open('https://qkys.zhugaotech.com/#/download');
                    })
                    .catch(() => {});
            } else {
                Dialog({ title: '检查更新', message: '已是最新版本' });
            }
        },
        deleteAccount() {
            if (!this.cardNum) {
                Toast('身份证号不可为空');
                return;
            }
            this.$api
                .post(`/qkys/api/clearPatientInfoByPId`, {
                    pId: this.pId,
                    cardNum: this.cardNum,
                })
                .then(() => {
                    Toast('删除成功');
                    jsBridge.logOut && jsBridge.logOut();
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$router.push('/login');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
    components: {
        TabBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Badge.name]: Badge,
        [Field.name]: Field,
        [Dialog.Component.name]: Dialog.Component,
    },
};
</script>

<style lang="less" scoped>
.mine-page {
    padding: 10px 8px;
    .mine-page-title {
        margin-bottom: 24px;
        font-size: 22px;
        text-align: center;
    }
    .mine-page-content {
        .item-btn {
            border-bottom: 1px solid #9e9e9e;
            padding: 10px 5px;
            font-size: 22px;
        }
    }
    .deleteDialog {
        .box {
            margin: 10px;
        }
    }
}
</style>
