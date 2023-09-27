import { PropType, defineComponent, reactive, ref } from 'vue';
import '@/components/common/login/Login.style.css';
import { CookieModal } from '@/components/cookie-modal/CookieModal.tsx';
import CookieForm from '@/components/cookie-form/CookieForm.vue';
import CookieFormItem from '@/components/cookie-form/CookieFormItem.vue';
import { CookieInput } from '@/components/cookie-input/CookieInput.tsx';
import CookieButton from '@/components/cookie-button/CookieButton.vue';

const Login = defineComponent({
  props: {
    showModal: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['onClose', 'onLogin'],
  setup(props, { emit }) {
    const isSelect = ref(false);
    const toggleSelect = () => {
      isSelect.value = !isSelect.value; // 切换时显示样式
    };
    const formRef = ref(); // 模板引用
    const form = reactive({
      email: '',
      password: '',
    }); // 表单数据
    const rules = ref<any[]>(); // 表单规则
    const handleClose = () => emit('onClose');
    const handleLogin = () => emit('onLogin', form); // 登录的操作

    return () => (
      <CookieModal showModal={props.showModal} onOnClose={handleClose}>
        {{
          header: () => (
            <section class={'header'}>
              <span class={{ isSelect: !isSelect.value }} onClick={toggleSelect}>
                登录
              </span>
              <span class={'gap_line'}></span>
              <span class={{ isSelect: isSelect.value }} onClick={toggleSelect}>
                注册
              </span>
            </section>
          ),
          body: () => {
            return !isSelect.value ? (
              <>
                <CookieForm ref={formRef} model={form} rules={rules}>
                  <CookieFormItem prop={'email'}>
                    <CookieInput v-model={form.email} type={'text'} placeholder="请输入邮箱" name="email" />
                  </CookieFormItem>
                  <CookieFormItem prop="password">
                    <CookieInput v-model={form.password} type="password" placeholder="请输入密码" name="password" />
                  </CookieFormItem>
                  {/* <CookieFormItem prop="rePassword">
                    <CookieInput v-model={form.rePassword} type="password" placeholder="请确认密码" name="rePassword" />
                  </CookieFormItem> */}
                  {/* <CookieFormItem prop="code"> */}
                  {/* <CookieInput v-model={form.code} type="text" placeholder="验证码" name="code">
                      {{
                        code: () => {
                          <div class={{ code: true, disabled: isDisable }} onClick={handleCode}>
                            <span>{countdown ? `${countdown}秒后重新发送` : `发送验证码`}</span>
                          </div>;
                        },
                      }}
                    </CookieInput> */}
                  {/* </CookieFormItem> */}
                </CookieForm>
                <CookieButton type={'submit'} class={'register-button'} onClick={handleLogin}>
                  登录
                </CookieButton>
              </>
            ) : null;
          },
          footer: () => {},
        }}
      </CookieModal>
    );
  },
});
export { Login };
