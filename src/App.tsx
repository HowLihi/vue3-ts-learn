import {
  createApp,
  defineComponent,
  h,
  createVNode,
  reactive,
  ref,
  Ref,
  watchEffect,
} from 'vue'
// const img = require('./assets/logo.png') // eslint-disable-line
import MonacoEditor from './components/MonacoEditor'
import demos from './demos'
import SchemaForm from '../lib'
import { createUseStyles } from 'vue-jss'
// function renderHelloWorld(num: number) {
//   return <HelloWorld age={num}></HelloWorld>
// }
type Schema = any
type UISchema = any
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    curser: 'pointor',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})
export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0)
    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })
    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })
    const methodRef: Ref<any> = ref()
    const classesRef = useStyles()
    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }
    // const schemaRef: Ref<any> = ref(schema)
    function handleCodeChange(
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        const json = JSON.parse(value)
        demo[filed] = json
        ;(demo as any)[`${filed}Code`] = value
      } catch (err) {}
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    return () => {
      const classes = classesRef.value
      const selected = selectedRef.value

      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              ></MonacoEditor>
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchema}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UIShema"
                ></MonacoEditor>
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                ></MonacoEditor>
              </div>
            </div>
            <div class={classes.form}>
              <SchemaForm
                schema={demo.schema}
                onChange={handleChange}
                value={demo.data}
              />
            </div>
          </div>
        </div>
      )
    }
  },
})
