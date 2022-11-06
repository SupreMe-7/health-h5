<template>
    <div class="add-diagnostics">
        <NavBar title="添加诊断" />
        <div>
            <van-field
                v-model="fieldValue"
                is-link
                readonly
                label="诊断"
                placeholder="请选择诊断"
                @click="show = true"
            />
            <van-popup v-model="show" round position="bottom">
                <van-cascader
                    v-model="curValue"
                    title="请选择要添加的诊断"
                    :options="options"
                    @close="show = false"
                    @finish="onFinish"
                    :field-names="fieldNames"
                />
            </van-popup>
        </div>
        <div class="btn-group">
            <van-button type="info" round @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Toast, Cascader, Field, Popup, Button, Dialog } from 'vant';
export default {
    data() {
        return {
            pId: '',
            dId: '',
            show: false,
            options: [],
            curValue: '',
            fieldValue: '',
            fieldNames: {
                text: 'name',
                value: 'id',
            },
            selectedOptions: {},
        };
    },
    components: {
        NavBar,
        [Cascader.name]: Cascader,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Button.name]: Button,
    },
    mounted() {
        this.pId = this.$route.query.pId;
        this.dId = sessionStorage.getItem('DID');
        this.supId = this.$route.query.supId;
        this.getList();
    },
    methods: {
        getList() {
            this.$api
                .get(`/qkys/api/doc/getDiagnosticas`)
                .then(res => {
                    const { data } = res;
                    this.options = data || [];
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onFinish({ selectedOptions }) {
            this.show = false;
            this.fieldValue = selectedOptions
                .map(option => option.name)
                .join('/');
            this.selectedOptions = selectedOptions;
        },
        submit() {
            let data =
                this.selectedOptions[this.selectedOptions.length - 1] || {};
            this.$api
                .post(`/qkys/api/doc/addPatientDiagnostica`, {
                    pId: this.pId,
                    diagnostica: data.name,
                    diagnosticaId: data.id,
                    doctorId: this.dId,
                    doctorType: 'Doc',
                })
                .then(() => {
                    Dialog.confirm({
                        title: '提交诊断审核',
                        message: '是否提交上级医生审核？',
                    })
                        .then(() => {
                            this.$api
                                .post(
                                    `/qkys/api/doc/submitDiagnosticaToSuperiorConsult`,
                                    {
                                        dId: this.dId,
                                        supId: this.supId,
                                        pId: this.pId,
                                    }
                                )
                                .then(() => {
                                    this.$router.back();
                                })
                                .catch(e => {
                                    Toast(e.errMsg);
                                });
                        })
                        .catch(() => {
                            this.$router.back();
                        });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.add-diagnostics {
    .btn-group {
        margin: 10px;
        text-align: right;
    }
}
</style>
