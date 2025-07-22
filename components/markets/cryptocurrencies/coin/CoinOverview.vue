<template>
    <div class='flex flex-col'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:grid-outline'
                size='43'
                class='mr-2 min-w-14'
            />
            <h5>Overview</h5>
        </div>
        
        <Table class='text-md'>
            <TableBody>
                <!--  Genesis  -->
                <TableRow v-if='genesis_date'>
                    <TableCell>Created</TableCell>
                    <TableCell class='flex flex-col'>
                        {{ genesis_date_label }}
                        <span class='text-sm text-muted-custom'>{{ generis_date_from_now }}</span>
                    </TableCell>
                </TableRow>
                
                <!--  Origin  -->
                <TableRow v-if='country_origin'>
                    <TableCell>Origin Country</TableCell>
                    <TableCell >{{ country_origin }}</TableCell>
                </TableRow>
                
                <!--  ATH  -->
                <TableRow v-if='ath_price'>
                    <TableCell>
                        All-Time High
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>All-Time High and Price Change from All-Time High &#40;&#37;&#41;.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    
                    <TableCell class='flex flex-col !items-end'>
                        <!--  ATH Price  -->
                        <div class='flex items-center'>
                            <span>{{ ath_price }}</span>
                            
                            <div class='ml-2 flex items-center text-sm'>
                                
                                <NuxtIcon
                                    :name='getTrendIcon(ath_change_percentage)'
                                    size='20'
                                    :class='getTextColor(ath_change_percentage)'
                                />
                                <span :class='getTextColor(ath_change_percentage)'>{{ ath_change_percentage_label }}</span>
                            </div>
                        </div>
                        
                        <!--  ATH Date -->
                        <div class='text-muted-custom text-sm'>
                            <span class='mr-1'>{{ ath_date_label }}</span>
                            <span>&#40;{{ ath_date_from_now }}&#41;</span>
                        </div>
                    </TableCell>
                </TableRow>
                
                <!--  ATL  -->
                <TableRow v-if='atl_price'>
                    <TableCell>
                        All-Time Low
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>All-Time Low and change in price&#40;&#37;&#41; relative to the coin’s all-time low.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    
                    <TableCell class='flex flex-col !items-end'>
                        <!--  ATL Price  -->
                        <div class='flex items-center'>
                            <span>{{ atl_price }}</span>
                            
                            <div class='ml-2 flex items-center text-sm'>
                                
                                <NuxtIcon
                                    :name='getTrendIcon(atl_change_percentage)'
                                    size='20'
                                    :class='getTextColor(atl_change_percentage)'
                                />
                                <span :class='getTextColor(atl_change_percentage)'>{{ atl_change_percentage_label }}</span>
                            </div>
                        </div>
                        
                        <!--  ATL Date -->
                        <div class='text-muted-custom text-sm'>
                            <span class='mr-1'>{{ atl_date_label }}</span>
                            <span>&#40;{{ atl_date_from_now }}&#41;</span>
                        </div>
                    </TableCell>
                </TableRow>
                
                <!--  Markets  -->
                <TableRow v-if='markets'>
                    <TableCell>
                        Markets
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of markets the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ markets }}</TableCell>
                </TableRow>
                
                <!--  Pairs  -->
                <TableRow v-if='pairs'>
                    <TableCell>
                        Pairs
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of unique markets the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ pairs }}</TableCell>
                </TableRow>
                
                <!--  Exchanges  -->
                <TableRow v-if='exchanges'>
                    <TableCell>
                        Exchanges
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of exchanges the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ exchanges }}</TableCell>
                </TableRow>
                
                <!--  Hashing Algorithm  -->
                <TableRow v-if='hashing_algorithm'>
                    <TableCell>Hashing Algorithm</TableCell>
                    <TableCell>{{ hashing_algorithm }}</TableCell>
                </TableRow>
                
                <!--  Ico Start  -->
                <TableRow v-if='ico_start'>
                    <TableCell>Ico Start</TableCell>
                    <TableCell class='flex flex-col'>
                        {{ ico_start_label }}
                        <span class='text-sm text-muted-custom'>{{ ico_start_from_now }}</span>
                    </TableCell>
                </TableRow>
                
                <!--  Ico End  -->
                <TableRow v-if='ico_end'>
                    <TableCell>Ico End</TableCell>
                    <TableCell class='flex- flex-col'>
                        {{ ico_end_label }}
                        <span class='text-sm text-muted-custom'>{{ ico_end_from_now }}</span>
                    </TableCell>
                </TableRow>
                
                <!--  Github Forks  -->
                <TableRow v-if='github_forks'>
                    <TableCell  class='text-color-warning'>
                        Forks
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    name='iconoir:git-fork'
                                    size='25'
                                    class='flex ml-2 text-yellow-500'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Github forks.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ github_forks }}</TableCell>
                </TableRow>
                
                <!--  Github Stars  -->
                <TableRow v-if='github_stars'>
                    <TableCell>
                        Stars
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    name='iconoir:star'
                                    size='22'
                                    class='flex ml-2 text-yellow-500'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Github stars.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ github_stars }}</TableCell>
                </TableRow>
                
                <!--  Github Issues  -->
                <TableRow v-if='github_issues'>
                    <TableCell>
                        Issues
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    name='iconoir:git-pull-request'
                                    size='23'
                                    class='flex ml-2 text-yellow-400'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Github issues.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ github_issues }}</TableCell>
                </TableRow>
                
                <!--  Github Commits  -->
                <TableRow v-if='github_commits'>
                    <TableCell>
                        Commits
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    name='radix-icons:commit'
                                    size='25'
                                    class='flex ml-2 text-yellow-400'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Github commits in the last 30 days.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ github_commits }}</TableCell>
                </TableRow>
                
                
                <!--  Github Contributors  -->
                <TableRow v-if='github_contributors'>
                    <TableCell>
                        Contributors
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    name='iconoir:github'
                                    size='22'
                                    class='flex ml-2 text-yellow-400'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Github contributors.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ github_contributors }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
    const coingecko = toRef(coin.value.coingecko);
    
    const genesis_date = coingecko.value?.genesis_date;
    const generis_date_from_now = dayjs(genesis_date).fromNow();
    const genesis_date_label = dayjs(genesis_date).format('MMM D, YYYY');
    
    const country_origin = coingecko.value?.country_origin;
    
    const ath_price = coingecko.value?.market_data?.ath?.usd;
    const ath_date = coingecko.value?.market_data?.ath_date?.usd;
    const ath_date_from_now = dayjs(ath_date).fromNow();
    const ath_date_label = dayjs(ath_date).format('MMM D, YYYY');
    const ath_change_percentage = coingecko.value?.market_data?.ath_change_percentage?.usd;
    const ath_change_percentage_label = formatNumber(ath_change_percentage, {
        style: 'percent', compact: true, decimals: 2,
    });
    
    const atl_price = coingecko.value?.market_data.atl?.usd;
    const atl_date = coingecko.value?.market_data?.atl_date?.usd;
    const atl_date_from_now = dayjs(atl_date).fromNow();
    const atl_date_label = dayjs(atl_date).format('MMM D, YYYY');
    const atl_change_percentage = coingecko.value?.market_data?.atl_change_percentage?.usd;
    const atl_change_percentage_label = formatNumber(atl_change_percentage, {
        style: 'percent', compact: true, decimals: 2,
    });
    
    const markets = livecoinwatch.value?.markets;
    const pairs = livecoinwatch.value?.pairs;
    const exchanges = livecoinwatch.value?.exchanges;
    const hashing_algorithm = coingecko.value?.hashing_algorithm;
    
    const ico = coingecko.value?.ico_data;
    const ico_start = ico?.ico_start_date;
    const ico_start_label = dayjs(ico_start).format('MMM D, YYYY');
    const ico_start_from_now = dayjs(ico_start).fromNow();
    const ico_end = ico?.ico_end_date;
    const ico_end_label = dayjs(ico_end).format('MMM D, YYYY');;
    const ico_end_from_now = dayjs(ico_end).fromNow();
    
    const github_forks = formatNumber(coingecko.value?.developer_data?.forks, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_stars = formatNumber(coingecko.value?.developer_data?.stars, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_commits = formatNumber(coingecko.value?.developer_data?.commit_count_4_weeks, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_contributors = formatNumber(coingecko.value?.developer_data?.pull_request_contributors, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_issues = formatNumber(coingecko.value?.developer_data?.total_issues, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
</script>

<style scoped>
    [data-slot='table-row'] {
        align-items: baseline;
        display: flex;
        justify-content: space-between;
    }
    [data-slot='table-cell'] {
        display: flex;
        align-items: center;
    }
</style>