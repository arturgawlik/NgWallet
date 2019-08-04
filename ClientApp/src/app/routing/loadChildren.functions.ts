export function loadHomeModule() {
    return import('../components/home/home.module').then(mod => mod.HomeModule);
}

export function loadCadegoriesDefintionModule() {
    return import('../components/categories-definition/categories-definition.module').then(mod => mod.CategoriesDefinitionModule);
}

export function loadWalletDefinitionModule() {
    return import('../components/wallet-definition/wallet-definition.module').then(mod => mod.WalletDefinitionModule);
}

export function loadLoginModule() {
    return import('../components/login/login.module').then(mod => mod.LoginModule);
}
