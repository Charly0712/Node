interface Type<T> {
    new (...args: any[]): T;
}

//se crea un tipo Token que puede ser de tipo Type o string
type Token<T> = Type<T> | string;

//se crea un tipo BinderType que puede ser de tipo lazySingleton o factory
type BinderType = 'lazySingleton' | 'factory';

//se crea un tipo Binder que tiene un tipo BinderType y una funcion que retorna un objeto de tipo T
type Binder<T> = {
    type: BinderType;
    fn: () => T;
};

export class DependencyLocator {
    //objeto inmutable
    private factories = new Map<Token<any>, Binder<any>>(); //variable factori tendra puros servicios
    private lazySingletons = new Map<Token<any>, any>(); //variable lazySingletons 
 
    private static instance: DependencyLocator;

    private constructor() {}
    
    //metodo  
    public bindFactory<T>(token: Type<T> | string, fn: () => T) {
        this.factories.set(token, { type: 'factory', fn });
    }
    
    //metodo recibe un token y una funcion LasySingleton tendra clases que necesitar a traves de una inyeccion de dependencias de servicios
    public bindLazySingleton<T>(token: Type<T> | string, fn: () => T) {
        this.factories.set(token, { type: 'lazySingleton', fn });
    }

    //metodo estatico que retorna una instancia de la clase DependencyLocator 
    static getInstance(): DependencyLocator {
      if (!DependencyLocator.instance) {
        DependencyLocator.instance = new DependencyLocator();
      }
 
      return DependencyLocator.instance;
    }

    //metodo que recibe un token y retorna un objeto de tipo T 
    public get<T>(token: Type<T> | string): T {
      const factory = this.factories.get(token);
        
      //si no existe el token en el mapa factories se lanza un error
      if (!factory) {
        throw new Error(`Dependency ${token} is not registered`);
      }
      
      //si el tipo de factory es lazySingleton se crea una instancia de la clase y se guarda en el mapa lazySingletons 
      if (factory.type === 'lazySingleton') {
        const singleton = this.lazySingletons.get(token) || factory.fn();
        this.lazySingletons.set(token, singleton);
 
        return singleton;
        //si el tipo de factory es factory se retorna una instancia de la clase 
      } else {
        return factory.fn();
      }
    }
    
    //metodo que limpia los mapas factories y lazySingletons 
    public clear() {
      this.factories.clear();
      this.lazySingletons.clear();
    }
}