<script>
	import AboutSection from '../../frontend/molecules/aboutSection.svelte';
	import AlignItems from '../../frontend/atoms/AlignItems.svelte';
	import Article from '../../frontend/templates/article.svelte';
	import ArticleSection from '../../frontend/atoms/ArticleSection.svelte';
	import AwardImage from '../../frontend/atoms/AwardImage.svelte';
	import BioCard from '../../frontend/molecules/bioCard.svelte';
	import Calender from '../../frontend/molecules/Calender.svelte';
	import Empty from './Empty.svelte';
	import Footer from '../../frontend/organisms/Footer.svelte';
	import MensaCard from '../../frontend/molecules/MensaCard.svelte';
	import Nav from '../../frontend/organisms/Nav.svelte';
	import NavMenuFix from '../../frontend/test/NavMenuFix.svelte';
	import NavMenuItemFix from '../../frontend/test/NavMenuItemFix.svelte';
	import SectionWrapper from '../../frontend/molecules/sectionWrapper.svelte';
	import Slot from '../../frontend/atoms/Slot.svelte';
	import SmallHero from '../../frontend/organisms/smallHero.svelte';
	import StaffCard from '../../frontend/molecules/staffCard.svelte';
	import Task from '../../frontend/atoms/task.svelte';
	import TestFooter from '../../frontend/organisms/TestFooter.svelte';
	import TestHero from '../../frontend/organisms/TestHero.svelte';
	import TestNavFix from '../../frontend/test/TestNavFix.svelte';

	export let component;
</script>

{#if component.name === 'AboutSection'}
	<AboutSection component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</AboutSection>
{/if}
{#if component.name === 'AlignItems'}
	<AlignItems component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</AlignItems>
{/if}
{#if component.name === 'Article'}
	<Article component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Article>
{/if}
{#if component.name === 'ArticleSection'}
	<ArticleSection component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</ArticleSection>
{/if}
{#if component.name === 'AwardImage'}
	<AwardImage component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</AwardImage>
{/if}
{#if component.name === 'BioCard'}
	<BioCard component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</BioCard>
{/if}
{#if component.name === 'Calender'}
	<Calender component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Calender>
{/if}
{#if component.name === 'Empty'}
	<Empty component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Empty>
{/if}
{#if component.name === 'Footer'}
	<Footer component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Footer>
{/if}
{#if component.name === 'MensaCard'}
	<MensaCard component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</MensaCard>
{/if}
{#if component.name === 'Nav'}
	<Nav component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Nav>
{/if}
{#if component.name === 'NavMenuFix'}
	<NavMenuFix component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</NavMenuFix>
{/if}
{#if component.name === 'NavMenuItemFix'}
	<NavMenuItemFix component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</NavMenuItemFix>
{/if}
{#if component.name === 'SectionWrapper'}
	<SectionWrapper component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</SectionWrapper>
{/if}
{#if component.name === 'Slot'}
	<Slot component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Slot>
{/if}
{#if component.name === 'SmallHero'}
	<SmallHero component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</SmallHero>
{/if}
{#if component.name === 'StaffCard'}
	<StaffCard component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</StaffCard>
{/if}
{#if component.name === 'Task'}
	<Task component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</Task>
{/if}
{#if component.name === 'TestFooter'}
	<TestFooter component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</TestFooter>
{/if}
{#if component.name === 'TestHero'}
	<TestHero component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</TestHero>
{/if}
{#if component.name === 'TestNavFix'}
	<TestNavFix component="{component}" blueprint="{component.blueprint}" {...component.props}>
		{#each component.children as child}
			<svelte:self bind:component="{child}" />
		{/each}
	</TestNavFix>
{/if}
