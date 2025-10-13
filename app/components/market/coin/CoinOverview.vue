<template>
    <Card class='coin-overview flex flex-col gap-16 p-10 w-full'>
        <!--  Overview  -->
        <div class='flex flex-col gap-4'>
            <!--  Overview Title  -->
            <div class='flex items-center gap-3'>
                <NuxtIcon
                    name='iconoir:view-grid'
                    size='20'
                />
                <h4>Overview</h4>
            </div>
            
            <!--  Overview Table  -->
            <Table>
                <TableBody>
                    <!--  Genesis  -->
                    <TableRow v-if='genesis_date'>
                        <TableCell>Genesis</TableCell>
                        <TableCell>
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger>
                                    {{ genesis_date_label }}
                                </HoverCardTrigger>
                                
                                <HoverCardContent>
                                    {{ generis_date_from_now }}
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                    </TableRow>
                    
                    <!--  Origin  -->
                    <TableRow v-if='country_origin'>
                        <TableCell>Origin Country</TableCell>
                        <TableCell>{{ country_origin }}</TableCell>
                    </TableRow>
                    
                    <!--  ATH  -->
                    <TableRow v-if='ath_price'>
                        <TableCell>
                            All-Time High
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='20'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    Coin price all-time high (ATH) in &#65284;USD and percentage change from ATH.
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        
                        <TableCell class='flex flex-col !items-end'>
                            <!--  ATH Price  -->
                            <div class='flex items-center'>
                                <span>{{ ath_price }}</span>
                                
                                <div class='ml-2 flex items-center text-xxs'>
                                    <NuxtIcon
                                        :name='getTrendIcon(ath_change_percentage)'
                                        size='10'
                                        :class='getTextColorClass(ath_change_percentage)'
                                    />
                                    <span
                                        :class='getTextColorClass(ath_change_percentage)'
                                    >{{ ath_change_percentage_label }}</span>
                                </div>
                            </div>
                            
                            <!--  ATH Date -->
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='text-muted-custom'>
                                    {{ ath_date_label }}
                                </HoverCardTrigger>
                                
                                <HoverCardContent>
                                    {{ ath_date_from_now }}
                                </HoverCardContent>
                            </HoverCard>
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
                                        size='20'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <span>Coin price all-time low (ATL) in &#65284;USD and percentage change from ATL.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        
                        <TableCell class='flex flex-col !items-end'>
                            <!--  ATL Price  -->
                            <div class='flex items-center'>
                                <span>{{ atl_price }}</span>
                                
                                <div class='ml-2 flex items-center text-xxs'>
                                    
                                    <NuxtIcon
                                        :name='getTrendIcon(atl_change_percentage)'
                                        size='10'
                                        :class='getTextColorClass(atl_change_percentage)'
                                    />
                                    <span
                                        :class='getTextColorClass(atl_change_percentage)'
                                    >{{ atl_change_percentage_label }}</span>
                                </div>
                            </div>
                            
                            <!--  ATL Date -->
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='text-muted-custom'>
                                    {{ atl_date_label }}
                                </HoverCardTrigger>
                                
                                <HoverCardContent>
                                    {{ atl_date_from_now }}
                                </HoverCardContent>
                            </HoverCard>
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
                                        size='20'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <span>The number of markets the coin is present at.</span>
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
                                        size='20'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <span>The number of unique markets the coin is present at.</span>
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
                                        size='20'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <span>The number of exchanges the coin is present at.</span>
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
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger>
                                    {{ ico_start_label }}
                                </HoverCardTrigger>
                                
                                <HoverCardContent>
                                    {{ ico_start_from_now }}
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                    </TableRow>
                    
                    <!--  Ico End  -->
                    <TableRow v-if='ico_end'>
                        <TableCell>Ico End</TableCell>
                        <TableCell class='flex- flex-col'>
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger>
                                    {{ ico_end_label }}
                                </HoverCardTrigger>
                                
                                <HoverCardContent>
                                    {{ ico_end_from_now }}
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
        <!--  Github  -->
        <div v-if='show_github_table' class='flex flex-col gap-6'>
            <!--  Github Title  -->
            <div class='flex items-center gap-3'>
                <NuxtIcon
                    name='iconoir:github'
                    size='20'
                />
                <h4>Github</h4>
            </div>
            
            <!--  Github Table  -->
            <Table>
                <TableBody>
                    <!--  Github Forks  -->
                    <TableRow v-if='github_forks_label'>
                        <TableCell>
                            Forks
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='flex items-center'>
                                    <NuxtIcon
                                        name='iconoir:git-fork'
                                        size='17'
                                        class='flex ml-2 text-yellow-selective'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span>Github forks.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        <TableCell>{{ github_forks_label }}</TableCell>
                    </TableRow>
                    
                    <!--  Github Stars  -->
                    <TableRow v-if='github_stars_label'>
                        <TableCell>
                            Stars
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='flex items-center'>
                                    <NuxtIcon
                                        name='iconoir:star'
                                        size='15'
                                        class='flex ml-2 text-yellow-selective'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span>Github stars.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        <TableCell>{{ github_stars_label }}</TableCell>
                    </TableRow>
                    
                    <!--  Github Issues  -->
                    <TableRow v-if='github_issues_label'>
                        <TableCell>
                            Issues
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='flex items-center'>
                                    <NuxtIcon
                                        name='iconoir:git-pull-request'
                                        size='15'
                                        class='flex ml-2 text-yellow-selective'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span>Github issues.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        <TableCell>{{ github_issues_label }}</TableCell>
                    </TableRow>
                    
                    <!--  Github Commits  -->
                    <TableRow v-if='github_commits_label'>
                        <TableCell>
                            Commits
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='flex items-center'>
                                    <NuxtIcon
                                        name='radix-icons:commit'
                                        size='17'
                                        class='flex ml-2 text-yellow-selective'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span>Github commits in the last 30 days.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        <TableCell>{{ github_commits_label }}</TableCell>
                    </TableRow>
                    
                    <!--  Github Contributors  -->
                    <TableRow v-if='github_contributors_label'>
                        <TableCell>
                            Contributors
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='flex items-center'>
                                    <NuxtIcon
                                        name='iconoir:github'
                                        size='15'
                                        class='flex ml-2 text-yellow-selective'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span>Github contributors.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                        <TableCell>{{ github_contributors_label }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </Card>
</template>

<script setup>
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.ts';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Card, CardTitle, CardDescription, CardFooter, CardHeader } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    
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
    
    const ath_price = formatNumber(coingecko.value?.market_data?.ath?.usd);
    const ath_date = coingecko.value?.market_data?.ath_date?.usd;
    const ath_date_from_now = dayjs(ath_date).fromNow();
    const ath_date_label = dayjs(ath_date).format('MMM D, YYYY');
    const ath_change_percentage = coingecko.value?.market_data?.ath_change_percentage?.usd.toFixed(2);
    const ath_change_percentage_label = formatNumber(ath_change_percentage, {
        style: 'percent', compact: true, decimals: 2,
    });
    
    const atl_price = formatNumber(coingecko.value?.market_data.atl?.usd);
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
    
    const show_github_table = computed(() => github_forks || github_stars || github_commits || github_contributors || github_issues);
    const github_forks = coingecko.value?.developer_data?.forks;
    const github_forks_label = github_forks > 0 && formatNumber(github_forks, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_stars = coingecko.value?.developer_data?.stars;
    const github_stars_label = github_stars > 0 && formatNumber(github_stars, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_commits = coingecko.value?.developer_data?.commit_count_4_weeks;
    const github_commits_label = github_commits > 0 && formatNumber(github_commits, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_contributors = coingecko.value?.developer_data?.pull_request_contributors;
    const github_contributors_label = github_contributors > 0 && formatNumber(github_contributors, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
    const github_issues = coingecko.value?.developer_data?.total_issues;
    const github_issues_label = github_issues > 0 && formatNumber(github_issues, {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    });
</script>

<style scoped>
    tr{
        align-items: baseline;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        gap: 32px;
    }
    td {
        display: flex;
        align-items: center;
        padding: 8px 0;
    }
</style>