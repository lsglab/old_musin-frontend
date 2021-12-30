<script context="module">
    import { request } from '../Utils/requests';
    import Export from '../components/cms/export.svelte';

    async function fetchCustomComponents(apiUrl) {
        const res = await request(`${apiUrl}/components?_norelations=true`, 'get', {}, false);

        if (res.status === 200) {
            return res.data.components;
        }
        return [];
    }

    async function fetchData(apiUrl, path, context) {
        const res = await request(`${apiUrl}/sites?path=${path}`, 'get', {}, false);

		if (res.status !== 200) {
			return context.error(res.status, res.data.message);
		}

        return JSON.parse(res.data.sites[0].blueprint);
    }

    export async function preload(page, session) {
        const apiUrl = session.globals.apiUrl;
        let path = page.path;

        if(path === '/'){
            path = '/index';
        }

        const customComponents = await fetchCustomComponents(apiUrl);
        // eslint-disable-next-line babel/no-invalid-this
		const data = await fetchData(apiUrl, path, this);

        return { customComponents, data };
    }
</script>

<script>
    export let customComponents;
    export let data;
</script>

<div style="visibility:hidden;"></div>

<Export data="{data}" customComponents="{customComponents}" />
