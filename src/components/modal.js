/*
 * config = {
 *  shown,
 *  title,
 *  confirmText,
 *  cancelText,
 *  change,
 *  message,
 * }
 *  STEP 1:
 *  
 *  edit .wxml, add <include src='YOUR_PATH_TO/modal.wxml'/>
 *
 *  STEP 2:
 *
 *  var ActionSheet = require('YOUR_PATH_TO/modal.js')
 *
 *  STEP 3:
 *
 *  // add into onLoad func
 *  this.toast = new Modal(this)
 *
 *  STEP 4:
 *
 *  that.toast.show({
 *      title: '弹窗',
 *      message: 'toast 消息',
 *      confirmText: '确定',
 *      cancelText: '取消',
 *      change: function(isOk){
 *          // invoke after toast hidden
 *      }
 *  })
 */
const MODAL = '__modal__'
const noop = function(isOk) {}

function Modal(context) {

    context.__modal__change = noop

    this.toggle = function() {
        let config = context.data.__modal__
        config.shown = !config.shown
        context.setData({ __modal__: config })
    }

    this.hide = this.toggle

    this.show = function(config) {
        let _config = {
            shown: true,
            title: config.title,
            cancelText: config.cancelText,
            confirmText: config.confirmText,
            message: config.message,
        }

        context.setData({ __modal__: _config }) 
        context.__modal__change = config.change || noop
    }
}

module.exports = Modal 
