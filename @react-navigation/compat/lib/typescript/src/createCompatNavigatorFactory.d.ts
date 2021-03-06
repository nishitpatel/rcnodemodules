import * as React from 'react';
import { NavigationState, ParamListBase, TypedNavigator, NavigationProp, EventMapBase } from '@react-navigation/native';
import { CompatRouteConfig } from './types';
export default function createCompatNavigatorFactory<CreateNavigator extends () => TypedNavigator<ParamListBase, NavigationState, {}, EventMapBase, React.ComponentType<any>>>(createNavigator: CreateNavigator): <NavigationPropType extends NavigationProp<any, any, any, any, any>, ParamList extends Record<string, object | undefined> = NavigationPropType extends NavigationProp<infer P, string, NavigationState, {}, {}> ? P : Record<string, object | undefined>, ScreenOptions extends {} = NavigationPropType extends NavigationProp<any, any, any, infer O, {}> ? O : {}, NavigationConfig extends {} = React.ComponentProps<ReturnType<CreateNavigator>["Navigator"]>>(routeConfig: CompatRouteConfig<NavigationPropType, NavigationPropType extends NavigationProp<infer P_1, string, NavigationState, {}, {}> ? P_1 : Record<string, object | undefined>>, navigationConfig?: Partial<Pick<NavigationConfig, Exclude<keyof NavigationConfig, "screenOptions">>> & {
    order?: Extract<keyof ParamList, string>[] | undefined;
    defaultNavigationOptions?: ScreenOptions | undefined;
    navigationOptions?: Record<string, any> | undefined;
}) => {
    ({ screenProps }: {
        screenProps?: unknown;
    }): JSX.Element;
    navigationOtions: Record<string, any> | undefined;
};
