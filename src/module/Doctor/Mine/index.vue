<template>
    <div class="mine-page">
        <div class="mine-page-title">
            我的
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
                    title="意见与建议"
                    size="large"
                    is-link
                    @click="jumpUrl('/patients/notice')"
                    icon="question-o"
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

        <TabBar type="doctor" :nowKey="2"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';
import { Cell, CellGroup, Toast, Badge, Dialog } from 'vant';
import { jsBridge } from '@/common/util.js';
export default {
    data() {
        return {
            version: {
                hasNewVersion: false,
            },
        };
    },
    mounted() {
        // this.getUpdate();
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
            sessionStorage.clear();
            this.$router.push('/patients/login');
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
                        window.open(
                            'https://qkys.zhugaotech.com/downloads/Qkys_android_person.apk'
                        );
                    })
                    .catch(() => {});
            } else {
                Dialog({ title: '检查更新', message: '已是最新版本' });
            }
        },
    },
    components: {
        TabBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Badge.name]: Badge,
    },
};
</script>

<style lang="less" scoped>
.mine-page {
    padding: 10px 8px;
    .mine-page-title {
        margin-bottom: 24px;
        font-size: 28px;
        text-align: center;
    }
    .mine-page-content {
        .item-btn {
            border-bottom: 1px solid #9e9e9e;
            padding: 10px 5px;
            font-size: 22px;
        }
    }
}
</style>
