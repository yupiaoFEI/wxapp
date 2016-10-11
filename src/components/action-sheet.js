/*
 * config = {
 *  shown,
 *  cancelText,
 *  change,
 *  items: ['item0','item1']
 * }
 *  
 *  STEP 1:
 *  
 *  edit .wxml, add <include src='YOUR_PATH_TO/action-sheet.wxml'/>
 *
 *  STEP 2:
 *
 *  var ActionSheet = require('YOUR_PATH_TO/action-sheet.js')
 *  
 *  STEP 3:
 *
 *  // add into onLoad func
 *  this.actionsheet = new ActionSheet(this)
 *
 *  STEP 4:
 *
 *  that.actionsheet.show({
 *      actions: ['电影', '演出', '赛事'],
 *      cancelText: '我知道了',
 *      change: function(e) {
 *          if(!e) {
 *              console.log('点击了取消');
 *          } else {
 *              console.log(e.target.dataset.name);
 *          }
 *      }
 *  })
 */
const ACTION__SHEET = '__action__sheet__'
const noop = function(isOk) {}

function ActionSheet(context) {

    context.__action__sheet__change = noop

    this.toggle = function() {
        let config = context.data.__action__sheet__
        config.shown = !config.shown
        context.setData({ __action__sheet__: config })
    }

    this.hide = this.toggle

    this.show = function(config) {
        let _config = {
            shown: true,
            cancelText: config.cancelText,
            actions: config.actions,
        }

        let that = this

        context.setData({ __action__sheet__: _config }) 
        context.__action__sheet__change = function(e) {
            config.change(false)
            that.hide()
        }
        context.__action__sheet__tap = function(e) {
            config.change(e)
            that.hide()
        }

    }
}

module.exports = ActionSheet 
