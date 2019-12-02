import React from 'react';

type Action = 'ADD';

export type Dispatch = React.Dispatch<Action>;

type DispatchProps = React.PropsWithChildren<{
  dispatch: Dispatch;
}>;

export const AppContext = React.createContext({
  AppState: {},
  dispatch: (action: any) => {}
});

// type MapStateToProps<P> = (state: P) => Partial<P>;

// export function connectToContext<A extends object>(context: React.Context<A>) {
//   return function connect(mapStateToProps?: MapStateToProps<A>) {
//     return <P extends {}>(
//       Component: React.ComponentType<P>
//     ): React.FC<P & Partial<A>> => {
//       return (props: P) => {
//         let stateToProps: Partial<A> = {};
//         if (typeof mapStateToProps === 'function') {
//           const state = React.useContext(context);
//           stateToProps = mapStateToProps(state);
//         }
//         const nextProps: P = {
//           ...props,
//           ...stateToProps
//         };

//         // eslint-disable-next-line react/jsx-props-no-spreading

//         return Component;
//       };
//     };
//   };
// }

// export const connect = connectToContext(AppContext);
