<!-- this component is supposed to be used for large amount of text fetched from the cms -->
<!-- (everything that is written is a RICH text editor) in order to provide the same styling of the html
on the whole page -->
<div><slot></slot></div>

<style>
    div :global(a){
        text-decoration: none;
        color: var(--link)
    }
    
    div :global(p){
        font-weight: 400;
        letter-spacing: normal;
        font-size: 1rem;
        line-height: 1.5625;
    }

    div :global(h2){
        font-weight: 400;
    }

    div :global(h3){
        font-weight: 400;
    }

    div :global(h4){
        font-weight: 400;
    }
    
    div :global(li){
        font-size: 1rem;
        padding: 4px;
        line-height: 1.3625;
    }

    div :global(figure){
        margin: 50px auto;
        width: inherit;
    }

    div :global(img){
        max-width: 100%;
    }

    div :global(figcaption){
        color: var(--light-text);
    }
    
    div :global(table){
        border-collapse: collapse;
    }
    
    div :global(td){
        border: 1px solid black;
        text-align: center;
        vertical-align: middle;
        padding: 10px;
    }
    div :global(th){
        word-break: keep-all;
        hyphens: none;
        border: 1px solid black;
        background-color: #f5f8fd;
        font-weight: 600;
        text-align: center;
        vertical-align: middle;
        padding: 10px;
    }

    div :global(blockquote){
        border-left: 5px #CCCCCC solid;
        margin: 0px;
        padding-left: 20px;
    }

    @media (max-width: 500px){
        div :global(th){
            hyphens: auto;
            word-break: break-word;
        }
    }
</style>