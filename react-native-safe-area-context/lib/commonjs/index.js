var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.SafeAreaProvider=SafeAreaProvider;exports.useSafeArea=useSafeArea;exports.SafeAreaView=SafeAreaView;Object.defineProperty(exports,"initialWindowSafeAreaInsets",{enumerable:true,get:function get(){return _InitialWindowSafeAreaInsets.default;}});exports.SafeAreaConsumer=exports.SafeAreaContext=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var React=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _NativeSafeAreaView=_interopRequireDefault(require("./NativeSafeAreaView"));var _InitialWindowSafeAreaInsets=_interopRequireDefault(require("./InitialWindowSafeAreaInsets"));var _jsxFileName="/Users/janic/Developer/react-native-safe-area-context/src/index.tsx";var SafeAreaContext=React.createContext(null);exports.SafeAreaContext=SafeAreaContext;function SafeAreaProvider(_ref){var children=_ref.children,initialSafeAreaInsets=_ref.initialSafeAreaInsets;var parentInsets=useParentSafeArea();var _React$useState=React.useState(initialSafeAreaInsets||parentInsets),_React$useState2=(0,_slicedToArray2.default)(_React$useState,2),insets=_React$useState2[0],setInsets=_React$useState2[1];var onInsetsChange=React.useCallback(function(event){setInsets(event.nativeEvent.insets);},[]);return React.createElement(_NativeSafeAreaView.default,{style:styles.fill,onInsetsChange:onInsetsChange,__source:{fileName:_jsxFileName,lineNumber:28}},insets!=null?React.createElement(SafeAreaContext.Provider,{value:insets,__source:{fileName:_jsxFileName,lineNumber:30}},children):null);}var styles=_reactNative.StyleSheet.create({fill:{flex:1}});var SafeAreaConsumer=SafeAreaContext.Consumer;exports.SafeAreaConsumer=SafeAreaConsumer;function useParentSafeArea(){return React.useContext(SafeAreaContext);}function useSafeArea(){var safeArea=React.useContext(SafeAreaContext);if(safeArea==null){throw new Error('No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.');}return safeArea;}function SafeAreaView(_ref2){var style=_ref2.style,rest=(0,_objectWithoutProperties2.default)(_ref2,["style"]);var insets=useSafeArea();return React.createElement(_reactNative.View,(0,_extends2.default)({style:[{paddingTop:insets.top,paddingRight:insets.right,paddingBottom:insets.bottom,paddingLeft:insets.left},style]},rest,{__source:{fileName:_jsxFileName,lineNumber:65}}));}
//# sourceMappingURL=index.js.map