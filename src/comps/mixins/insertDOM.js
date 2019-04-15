/**
 * Created by Seven on 2019/4/15.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */

export default {
    mounted (){
        this.$nextTick(function() {
            document.body.appendChild(this.$el);
        })
    },
    beforeDestroy(){
        this.$el.remove();
    }
}