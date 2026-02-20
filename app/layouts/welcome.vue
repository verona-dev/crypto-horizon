<template>
    <div>
        <main class='flex flex-col my-0 min-h-screen items-center justify-center'>
            <ClientOnly>
                <slot />
            </ClientOnly>
        </main>
    </div>
</template>