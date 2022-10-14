import { defineComponent, h, createVNode, ref, nextTick } from 'vue'
import reload from './reload.vue'
import NProgress from '@/utils/system/nprogress'

export function createNameComponent(component) {
  return () => {
    return new Promise((res) => {
      component().then((comm) => {
        const name = (comm.default.name || 'vueAdminBox') + '$' + Date.now();
        const tempComm = defineComponent({
          name,
          setup() {
            const isReload = ref(false);
            let timeOut = null;
            const handleReload = () => {
              isReload.value = true;
              timeOut && clearTimeout(timeOut);
              NProgress.start();
              timeOut = setTimeout(() => {
                nextTick(() => {
                  NProgress.done();
                  isReload.value = false;
                });
              }, 260);
            };
            return {
              isReload,
              handleReload
            };
          },
          render: function () {
            if (this.isReload) {
              return h('div', { class: 'el-main-box' }, [h(reload)]);
            } else {
              return h('div', { class: 'el-main-box' }, [createVNode(comm.default)]);
            }
          }
        });
        res(tempComm);
      });
    });
  };
}

