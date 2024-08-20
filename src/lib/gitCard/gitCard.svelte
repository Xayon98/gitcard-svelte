<script lang="ts">
	import { onMount } from "svelte";

	export let name = "Nom";
	export let login = "Pseudo";
	export let avatar = "";
	export let bio = "Bio";
	export let location = "Location";
	export let company = "Company";
	export let email = "Email";
	export let url = "";
	export let status = {emojiHTML: "", message: ""};
	export let totalCount = 0;
	export let repositories: any[] = [];

	console.log(status);

	let flag = true;

	async function sleep(ms: number): Promise<void> {
		return new Promise(
		(resolve) => setTimeout(resolve, ms));
		
}

	onMount( async () => {
		if (!flag) {
			await sleep(1500);
			flag = true;
			}  
		}
	   
	);
	flag = true;

</script>



<div class="card w-full flex-row fill-[#8d97a1] text-slate-100 p-[35px]">
	{#if flag}
		<div class="basis-1/2">
			<div class="flex-col space-y-1">
				<div>
					<a href={url} class=" w-[150px] h-[150px] block rounded-full">
						<img src={avatar} alt="Avatar" width="150" height="150" class ="icon"/>
					</a>
					{#if (status)}
						
				
					<div class="absolute top-[33%] left-[16%] bg-[#0c1116] border-[#ffffff40] border-[1.5px] rounded-full w-6 h-6 text-center pt-[0.2rem] text-[0.75rem]">
						{@html status.emojiHTML}
					</div>
					{/if}
				</div>
				<div class="font-medium text-lg">
					<a href={url}>{name}</a>
				</div>
				<div class="font-thin -translate-y-3 text-[#8d97a1]">
					<a href={url}>{login}</a> 
				</div>
				<div class="text-[15px]">
					<p>{bio}</p>
				</div>
				
				<div class="flex flex-nowrap pt-4">
					<div class="flex-initial w-5 self-center ">
						<svg version="1.1" width="16" height="16" aria-hidden="true"><path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path></svg>
					</div>
					<div class="flex-auto text-[17px]">
						<p>{company}</p>
					</div>
				</div>
				<div class="flex flex-nowrap">
					<div class="flex-initial w-5 self-center">
						<svg version="1.1" width="16" height="16" aria-hidden="true"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
					</div>
					<div class="flex-auto text-[17px]">
						<p>{location}</p>
					</div>
				</div>
				<p>{email}</p>
			</div>
		</div>
		<div class="basis-1/2">
			<div class="flex-col flex-none">
				<div class="flex-col space-y-3">
					<p style="margin:0" class=" pl-1">Popular repositories</p>
					{#each repositories as repo,i}
						<div class="card flex-col flex-nowrap text-[17px] p-[15px] space-y-3 h-[7.5rem]" id={i.toString()}>
							<div class="flex-initial">
								<a href={repo.url} target="_blank" rel="noopener noreferrer">
									<p class="text-[#4493f8] font-medium">{repo.name}</p>
								</a>
							</div>
							<div class="text-[15px] text-[#8d97a1] flex-auto grow-1">
								<p>{repo.description}</p>
							</div>
							<div class="flex-initial">
								<div class="flex flex-nowrap space-x-1 text-[15px] text-[#8d97a1]">
									<div class="rounded-full size-3 self-center" style={`background-color: ${repo.primaryLanguage.color};`}></div>
									<p>{repo.primaryLanguage.name}</p>

								</div> 
							</div>
						</div>
						
					{/each}
					</div>
				<div/>
			</div>
		</div>
	{:else}
		
		<div class="basis-1/2 animate-pulse">        
			<div class="flex-col space-y-1">
				<svg class="icon w-[150px] h-[150px] me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
				</svg>
				<div class="font-medium text-lg">
					<div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-3 mt-3"></div>
				</div>
				<div class="font-thin -translate-y-3 text-[#8d97a1]">
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2.5 mt-5"></div> 
				</div>
				<div >
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-1.5 mt-4"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
				</div>
				
				<div class="flex flex-nowrap pt-4">
					<div class="flex-initial w-5 self-center ">
						<svg version="1.1" width="16" height="16" aria-hidden="true"><path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path></svg>
					</div>
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mt-0.5"></div>
				</div>
				<div class="flex flex-nowrap pt-1">
					<div class="flex-initial w-5 self-center">
						<svg version="1.1" width="16" height="16" aria-hidden="true"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
					</div>
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-0.5"></div>
				</div>
				<p>{email}</p>

			</div>
		</div>
		<div class="basis-1/2">
			<div class="flex-col flex-none">
				<div class="flex-col space-y-3">
					<p style="margin:0" class="pl-1">Popular repositories</p>
					{#each repositories as repo,i}
						<div class="card flex-col flex-nowrap text-[17px] p-[15px] space-y-3 h-[7.5rem] animate-pulse" id={i.toString()}>
							<div class="flex-initial">
								<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-2.5 mt-1"></div> 
							</div>
							<div class="text-[15px] text-[#8d97a1] flex-auto grow-1">
								<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5 mt-1"></div>
								<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-1.5 mt-1"></div> 
							</div>
							<div class="flex-initial">
								<div class="flex flex-nowrap space-x-1 text-[15px] text-[#8d97a1]">
									<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-2.5 mt-1"></div> 
								</div> 
							</div>
						</div>
						
					{/each}
					</div>
				<div/>
			</div>
		</div>

	{/if}
</div>



<style lang="scss">
	:root {
		font-size: 20px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

p {
	margin: 0;
}

p:not(:last-child) {
	margin-bottom: 1.5em;
}



.card {
	display: flex;
	justify-content: space-between;

	border: 1px solid rgba(255, 255, 255, .25);
	border-radius: 20px;
	background-color: #0c1116;
	box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

	backdrop-filter: blur(15px);
}

.icon {
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, .25);
}

</style>