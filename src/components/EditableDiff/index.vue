<template>
  <div>
    <h3>{{ label }}
      <a class="edit-link" @click="toggleEditMode">Edit</a>
    </h3>
    <div v-if="editMode && value" class="diff">
      <textarea v-model="value[field]" />
    </div>
    <pre v-else class="prettydiff" v-html="diff" />
  </div>
</template>

<script>
import prettydiff from 'prettydiff'

export default {
  name: 'EditableDiff',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    value: {
      type: Object,
      default: () => {}
    },
    original: {
      type: Object,
      default: null
    },
    field: {
      type: String,
      default: ''
    },
    viewType: {
      type: String,
      default: 'inline'
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    diff() {
      if (this.original && this.value) {
        return this.outputDiff(this.original[this.field], this.value[this.field], this.viewType)
      }
      if (this.value) {
        return this.value[this.field]
      }
    }
  },
  methods: {
    outputDiff(originalText, newText, viewType) {
      if (!originalText) {
        originalText = ''
      }
      if (!newText) {
        newText = ''
      }
      originalText = originalText.replace('\r\n', '\n')
      newText = newText.replace('\r\n', '\n')
      prettydiff.options.mode = 'diff'
      prettydiff.options.language = 'text'
      prettydiff.options.diff_format = 'html'
      prettydiff.options.diff_space_ignore = false
      prettydiff.options.diff_view = viewType
      prettydiff.options.source = originalText
      prettydiff.options.diff = newText
      return prettydiff()
    },
    toggleEditMode() {
      this.editMode = !this.editMode
    }
  }
}
</script>

<style lang="scss">
.edit-link {
  float: right;
  font-weight: normal;
  font-size: 0.8em;
  border-bottom: 1px dotted #777;
  color: #777;
}
.prettydiff > p {
  display: none;
}
.diff {
  background-color: #E4F1FE;
  display: flex;
  font-family: 'Courier New', Courier, monospace;
  padding: 0 1em;
  textarea {
    width: 100%;
    padding: .5em;
    border: 1px dotted #666;
    background: #FFf4FC;
  }
  ol {
    padding: 0;
    vertical-align: top;
    display: inline-block;
    list-style-type: none;
  }
  ol.count {
    display: none;
  }
  li {
    line-height: 1.4em;
  }
  h3.texttitle, p.author {
    display: none;
  }
  .delete {
    background-color: #FFCFF7;
  }
  .equal {
    background-color: #E4F1FE;
  }
  .insert {
    background-color: #C4FCDC;
  }
  .empty {
    line-height: 1em;
    height: 1em;
    background-color: #FFCFF7;
  }
  em {
    outline: 1px dotted salmon;
    background-color: #FFC46C;
    line-height: 0.8em;
    padding: 0;
  }
  .replace {
    background-color: #FFEED5;
  }
  .diff-left {
    border-right: 2px solid #AAA;
  }
  .diff-left, .diff-right {
    padding: 0 0.5em;
    width: 50%;
    overflow: scroll;
  }
}
</style>
