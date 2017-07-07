<script type="text/javascript">

  export default {
    props: {
      content: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        coms: [],
      };
    },
    render(h) {
      const coms = [];
      let rootComponent = 'div';
      for (let i = 0; i < this.content.length; i++) {
      // let component = this.content[i].component;
        const options = this.content[i];

        let configMod = null;

        if (options.cofigMod) {
          configMod = h(options.cofigMod, {
            slot: '__config',

            // props: {
            //   __configProps: options.__configProps,
            //   __configPath: options._componentsPath,
            //   __configModID: options.__configModID,
            // },
          });
        }

        const base = h(options.component, {
          props: {
            // __configProps: options.__configProps,
          },

        }, [configMod]);


        rootComponent = options.rootC || 'div';
        coms.push(base);
      }

      // this.coms = coms;
      return h(rootComponent, {}, coms);
    },
  };

</script>
