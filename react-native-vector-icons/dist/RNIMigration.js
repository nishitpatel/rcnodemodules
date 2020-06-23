var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf3=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _react=_interopRequireWildcard(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _FontAwesome=_interopRequireDefault(require("react-native-vector-icons/FontAwesome"));var _Foundation=_interopRequireDefault(require("react-native-vector-icons/Foundation"));var _Ionicons=_interopRequireDefault(require("react-native-vector-icons/Ionicons"));var _MaterialIcons=_interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));var _Zocial=_interopRequireDefault(require("react-native-vector-icons/Zocial"));var _SimpleLineIcons=_interopRequireDefault(require("react-native-vector-icons/SimpleLineIcons"));var _jsxFileName="/home/travis/build/oblador/react-native-vector-icons/RNIMigration.js";var ICON_SET_MAP={fontawesome:_FontAwesome.default,foundation:_Foundation.default,ion:_Ionicons.default,material:_MaterialIcons.default,zocial:_Zocial.default,simpleline:_SimpleLineIcons.default};var Icon=function(_PureComponent){(0,_inherits2.default)(Icon,_PureComponent);function Icon(){var _getPrototypeOf2;var _this;(0,_classCallCheck2.default)(this,Icon);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=(0,_possibleConstructorReturn2.default)(this,(_getPrototypeOf2=(0,_getPrototypeOf3.default)(Icon)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.iconRef=null;_this.handleComponentRef=function(ref){_this.iconRef=ref;};return _this;}(0,_createClass2.default)(Icon,[{key:"setNativeProps",value:function setNativeProps(nativeProps){if(this.iconRef){this.iconRef.setNativeProps(nativeProps);}}},{key:"render",value:function render(){var nameParts=this.props.name.split('|');var setName=nameParts[0];var name=nameParts[1];var IconSet=ICON_SET_MAP[setName];if(!IconSet){throw new Error("Invalid icon set \""+setName+"\"");}return _react.default.createElement(IconSet,(0,_extends2.default)({allowFontScaling:false,ref:this.handleComponentRef},this.props,{name:name,__source:{fileName:_jsxFileName,lineNumber:51}}));}}]);return Icon;}(_react.PureComponent);exports.default=Icon;Icon.propTypes={name:_propTypes.default.string.isRequired,size:_propTypes.default.number,color:_propTypes.default.string};