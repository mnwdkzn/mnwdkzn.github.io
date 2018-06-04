import { NgModuleRef, ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createNewHosts } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<AppModule>>) => {
  let ngModule: NgModuleRef<AppModule>;
  module.hot.accept();

  bootstrap().then(currentModule => {
    ngModule = currentModule;
  });

  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const removeOldHosts = createNewHosts(elements);
    ngModule.destroy();
    removeOldHosts();
  });
};

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (module['hot']) {
  hmrBootstrap(module, bootstrap);
} else {
  bootstrap();
}