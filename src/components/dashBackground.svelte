<script>
    export let customHeight
</script>

<div class="dash-background" style="height: {customHeight == undefined? `100vh` : customHeight}">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<style>
    .dash-background {
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        flex-wrap: nowrap;
        z-index: 1;
    }
    .dash-background > div {
        border-right: 1px dashed rgba(0,0,0,0.075);
        z-index: 99;
        height: 100%;
        width: 100%;
    }
</style>