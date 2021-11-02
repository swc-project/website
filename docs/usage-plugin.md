---
id: usage-plugin
title: Using custom plugins with swc
sidebar_label: Plugin
---

> Warning: Passing the AST to the JS Plugin system is a performance bottleneck.
> 
> Therefore we are concidering two approaches for the next SWC major version:
>
> 1. Creating a plugin system in Rust ([#2337](https://github.com/swc-project/swc/discussions/2337))
> 2. Solve the bottleneck to keep a JS plugin system ([#2175](https://github.com/swc-project/swc/issues/2175))

## JS Plugin Api

There are some helpers to help writing a transform.

### Plugin Example

The following custom plugin example will replace all `console.log(...)` statements with `void 0`.  
You can turn on optimizer with [`jsc.transform.optimizer`](/docs/configuring-swc#jsctransformoptimizer) to remove `void 0`.

From: https://github.com/swc-project/plugin-strip-console

```ts
import { CallExpression, Expression } from "@swc/core";
import Visitor from "@swc/core/Visitor";

class ConsoleStripper extends Visitor {
  visitCallExpression(expression: CallExpression): Expression {
    if (expression.callee.type !== "MemberExpression") {
      return expression;
    }

    if (
      expression.callee.object.type === "Identifier" &&
      expression.callee.object.value === "console"
    ) {
      if (expression.callee.property.type === "Identifier") {
        return {
          type: "UnaryExpression",
          span: expression.span,
          operator: "void",
          argument: {
            type: "NumericLiteral",
            span: expression.span,
            value: 0,
          },
        };
      }
    }

    return expression;
  }
}

const out = transformSync(
  `
if (foo) {
    console.log("Foo")
} else {
    console.log("Bar")
}`,
  {
    plugin: (m) => new ConsoleStripper().visitProgram(m),
  }
);

out.code ===
  `if (foo) {
    void 0;
} else {
    void 0;
}`;
```

### Visitor API

Visitors are a pattern used in AST traversal across languages. Simply put they are an object with methods defined for accepting particular node types in a tree. That's a bit abstract so let's look at an example.

```ts
/// @ts-check
import Visitor from "@swc/core/Visitor";

class MyVisitor extends Visitor {
  visitIdentifier(node) {
    console.log("called")
    return node;
  }
}
```

This is a basic visitor that when used during a traversal will call the visitIdentifier() method for every Identifier in the tree.

So with this code the visitIdentifier() method will be called four times with each Identifier (including square).

```ts
import { transformSync } from "@swc/core";

transformSync(`

  function square(n) {
    return n * n;
  }

`, {
  plugin: MyVisitor,
});

// Called!
// Called!
// Called!
// Called!
```

By extending `@swc/core/Visitor`[https://unpkg.com/browse/@swc/core/Visitor.d.ts] you can choose from a variety of visitors:

- visitProgram(n: Program): Program;
- visitModule(m: Module): Module;
- visitScript(m: Script): Script;
- visitModuleItems(items: ModuleItem[]): ModuleItem[];
- visitModuleItem(n: ModuleItem): ModuleItem;
- visitModuleDeclaration(n: ModuleDeclaration): ModuleDeclaration;
- visitTsNamespaceExportDeclaration(n: TsNamespaceExportDeclaration): ModuleDeclaration;
- visitTsExportAssignment(n: TsExportAssignment): TsExportAssignment;
- visitTsImportEqualsDeclaration(n: TsImportEqualsDeclaration): ModuleDeclaration;
- visitTsModuleReference(n: TsModuleReference): TsModuleReference;
- visitTsExternalModuleReference(n: TsExternalModuleReference): TsExternalModuleReference;
- visitExportAllDeclration(n: ExportAllDeclaration): ModuleDeclaration;
- visitExportDefaultExpression(n: ExportDefaultExpression): ModuleDeclaration;
- visitExportNamedDeclration(n: ExportNamedDeclaration): ModuleDeclaration;
- visitExportSpecifiers(nodes: ExportSpecifier[]): ExportSpecifier[];
- visitExportSpecifier(n: ExportSpecifier): ExportSpecifier;
- visitNamedExportSpecifier(n: NamedExportSpecifier): ExportSpecifier;
- visitExportNamespaceSpecifier(n: ExportNamespaceSpecifier): ExportSpecifier;
- visitExportDefaultSpecifier(n: ExportDefaultSpecifier): ExportSpecifier;
- visitOptionalStringLiteral(n: StringLiteral | undefined): StringLiteral | undefined;
- visitExportDefaultDeclaration(n: ExportDefaultDeclaration): ModuleDeclaration;
- visitDefaultDeclaration(n: DefaultDecl): DefaultDecl;
- visitFunctionExpression(n: FunctionExpression): FunctionExpression;
- visitClassExpression(n: ClassExpression): ClassExpression;
- visitExportDeclaration(n: ExportDeclaration): ModuleDeclaration;
- visitArrayExpression(e: ArrayExpression): Expression;
- visitArrayElement(e: ExprOrSpread | undefined): ExprOrSpread | undefined;
- visitExprOrSpread(e: ExprOrSpread): ExprOrSpread;
- visitSpreadElement(e: SpreadElement): SpreadElement;
- visitOptionalExpression(e: Expression | undefined): Expression | undefined;
- visitArrowFunctionExpression(e: ArrowFunctionExpression): Expression;
- visitArrowBody(body: BlockStatement | Expression): BlockStatement | Expression;
- visitBlockStatement(block: BlockStatement): BlockStatement;
- visitStatements(stmts: Statement[]): Statement[];
- visitStatement(stmt: Statement): Statement;
- visitSwitchStatement(stmt: SwitchStatement): Statement;
- visitSwitchCases(cases: SwitchCase[]): SwitchCase[];
- visitSwitchCase(c: SwitchCase): SwitchCase;
- visitIfStatement(stmt: IfStatement): Statement;
- visitOptionalStatement(stmt: Statement | undefined): Statement | undefined;
- visitBreakStatement(stmt: BreakStatement): Statement;
- visitWhileStatement(stmt: WhileStatement): Statement;
- visitTryStatement(stmt: TryStatement): Statement;
- visitCatchClause(handler: CatchClause | undefined): CatchClause | undefined;
- visitThrowStatement(stmt: ThrowStatement): Statement;
- visitReturnStatement(stmt: ReturnStatement): Statement;
- visitLabeledStatement(stmt: LabeledStatement): Statement;
- visitForStatement(stmt: ForStatement): Statement;
- visitForOfStatement(stmt: ForOfStatement): Statement;
- visitForInStatement(stmt: ForInStatement): Statement;
- visitEmptyStatement(stmt: EmptyStatement): Statement;
- visitDoWhileStatement(stmt: DoWhileStatement): Statement;
- visitDebuggerStatement(stmt: DebuggerStatement): Statement;
- visitWithStatement(stmt: WithStatement): Statement;
- visitDeclaration(decl: Declaration): Declaration;
- visitVariableDeclaration(n: VariableDeclaration): VariableDeclaration;
- visitVariableDeclarators(nodes: VariableDeclarator[]): VariableDeclarator[];
- visitVariableDeclarator(n: VariableDeclarator): VariableDeclarator;
- visitTsTypeAliasDeclaration(n: TsTypeAliasDeclaration): Declaration;
- visitTsModuleDeclaration(n: TsModuleDeclaration): Declaration;
- visitTsModuleName(n: TsModuleName): TsModuleName;
- visitTsNamespaceBody(n: TsNamespaceBody): TsNamespaceBody | undefined;
- visitTsNamespaceDeclaration(n: TsNamespaceDeclaration): TsModuleBlock | TsNamespaceDeclaration;
- visitTsModuleBlock(n: TsModuleBlock): TsModuleBlock | TsNamespaceDeclaration;
- visitTsInterfaceDeclaration(n: TsInterfaceDeclaration): TsInterfaceDeclaration;
- visitTsInterfaceBody(n: TsInterfaceBody): TsInterfaceBody;
- visitTsTypeElements(nodes: TsTypeElement[]): TsTypeElement[];
- visitTsTypeElement(n: TsTypeElement): TsTypeElement;
- visitTsEnumDeclaration(n: TsEnumDeclaration): Declaration;
- visitTsEnumMembers(nodes: TsEnumMember[]): TsEnumMember[];
- visitTsEnumMember(n: TsEnumMember): TsEnumMember;
- visitTsEnumMemberId(n: TsEnumMemberId): TsEnumMemberId;
- visitFunctionDeclaration(decl: FunctionDeclaration): Declaration;
- visitClassDeclartion(decl: ClassDeclaration): Declaration;
- visitClassBody(members: ClassMember[]): ClassMember[];
- visitClassMember(member: ClassMember): ClassMember;
- visitTsIndexSignature(n: TsIndexSignature): ClassMember;
- visitTsFnParameters(params: TsFnParameter[]): TsFnParameter[];
- visitTsFnParameter(n: TsFnParameter): TsFnParameter;
- visitPrivateProperty(n: PrivateProperty): ClassMember;
- visitPrivateMethod(n: PrivateMethod): ClassMember;
- visitPrivateName(n: PrivateName): PrivateName;
- visitConstructor(n: Constructor): ClassMember;
- visitConstructorParameters(nodes: (Param | TsParameterProperty)[]): (Param | TsParameterProperty)[];
- visitConstructorParameter(n: Param | TsParameterProperty): Param | TsParameterProperty;
- visitTsParameterProperty(n: TsParameterProperty): TsParameterProperty | Param;
- visitTsParameterPropertyParameter(n: TsParameterPropertyParameter): TsParameterPropertyParameter;
- visitPropertyName(key: PropertyName): PropertyName;
- visitAccessibility(n: Accessibility | undefined): Accessibility | undefined;
- visitClassProperty(n: ClassProperty): ClassMember;
- visitClassMethod(n: ClassMethod): ClassMember;
- visitPropertName(n: PropertyName): PropertyName;
- visitComputedPropertyKey(n: ComputedPropName): ComputedPropName;
- visitClass(n: T): T;
- visitFunction(n: T): T;
- visitTsExpressionsWithTypeArguments(nodes: TsExpressionWithTypeArguments[]): TsExpressionWithTypeArguments[];
- visitTsExpressionWithTypeArguments(n: TsExpressionWithTypeArguments): TsExpressionWithTypeArguments;
- visitTsTypeParameterInstantiation(n: TsTypeParameterInstantiation | undefined): TsTypeParameterInstantiation | undefined;
- visitTsTypes(nodes: TsType[]): TsType[];
- visitTsEntityName(n: TsEntityName): TsEntityName;
- visitTsQualifiedName(n: TsQualifiedName): TsQualifiedName;
- visitDecorators(nodes: Decorator[] | undefined): Decorator[] | undefined;
- visitDecorator(n: Decorator): Decorator;
- visitExpressionStatement(stmt: ExpressionStatement): Statement;
- visitContinueStatement(stmt: ContinueStatement): Statement;
- visitExpression(n: Expression): Expression;
- visitOptionalChainingExpression(n: OptionalChainingExpression): Expression;
- visitAssignmentExpression(n: AssignmentExpression): Expression;
- visitPatternOrExpressison(n: Pattern | Expression): Pattern | Expression;
- visitYieldExpression(n: YieldExpression): Expression;
- visitUpdateExpression(n: UpdateExpression): Expression;
- visitUnaryExpression(n: UnaryExpression): Expression;
- visitTsTypeAssertion(n: TsTypeAssertion): Expression;
- visitTsConstAssertion(n: TsConstAssertion): Expression;
- visitTsNonNullExpression(n: TsNonNullExpression): Expression;
- visitTsAsExpression(n: TsAsExpression): Expression;
- visitThisExpression(n: ThisExpression): Expression;
- visitTemplateLiteral(n: TemplateLiteral): Expression;
- visitParameters(n: Param[]): Param[];
- visitParameter(n: Param): Param;
- visitTaggedTemplateExpression(n: TaggedTemplateExpression): Expression;
- visitSequenceExpression(n: SequenceExpression): Expression;
- visitRegExpLiteral(n: RegExpLiteral): Expression;
- visitParenthesisExpression(n: ParenthesisExpression): Expression;
- visitObjectExpression(n: ObjectExpression): Expression;
- visitObjectProperties(nodes: (Property | SpreadElement)[]): (Property | SpreadElement)[];
- visitObjectProperty(n: Property | SpreadElement): Property | SpreadElement;
- visitProperty(n: Property): Property | SpreadElement;
- visitSetterProperty(n: SetterProperty): Property | SpreadElement;
- visitMethodProperty(n: MethodProperty): Property | SpreadElement;
- visitKeyValueProperty(n: KeyValueProperty): Property | SpreadElement;
- visitGetterProperty(n: GetterProperty): Property | SpreadElement;
- visitAssignmentProperty(n: AssignmentProperty): Property | SpreadElement;
- visitNullLiteral(n: NullLiteral): NullLiteral;
- visitNewExpression(n: NewExpression): Expression;
- visitTsTypeArguments(n: TsTypeParameterInstantiation | undefined): TsTypeParameterInstantiation | undefined;
- visitArguments(nodes: Argument[]): Argument[];
- visitArgument(n: Argument): Argument;
- visitMetaProperty(n: MetaProperty): Expression;
- visitMemberExpression(n: MemberExpression): Expression;
- visitExpressionOrSuper(n: Expression | Super): Expression | Super;
- visitJSXText(n: JSXText): JSXText;
- visitJSXNamespacedName(n: JSXNamespacedName): JSXNamespacedName;
- visitJSXMemberExpression(n: JSXMemberExpression): JSXMemberExpression;
- visitJSXObject(n: JSXObject): JSXObject;
- visitJSXFragment(n: JSXFragment): JSXFragment;
- visitJSXClosingFragment(n: JSXClosingFragment): JSXClosingFragment;
- visitJSXElementChildren(nodes: JSXElementChild[]): JSXElementChild[];
- visitJSXElementChild(n: JSXElementChild): JSXElementChild;
- visitJSXExpressionContainer(n: JSXExpressionContainer): JSXExpressionContainer;
- visitJSXSpreadChild(n: JSXSpreadChild): JSXElementChild;
- visitJSXOpeningFragment(n: JSXOpeningFragment): JSXOpeningFragment;
- visitJSXEmptyExpression(n: JSXEmptyExpression): Expression;
- visitJSXElement(n: JSXElement): JSXElement;
- visitJSXClosingElement(n: JSXClosingElement | undefined): JSXClosingElement | undefined;
- visitJSXElementName(n: JSXElementName): JSXElementName;
- visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement;
- visitJSXAttributes(attrs: JSXAttributeOrSpread[] | undefined): JSXAttributeOrSpread[] | undefined;
- visitJSXAttributeOrSpread(n: JSXAttributeOrSpread): JSXAttributeOrSpread;
- visitJSXAttribute(n: JSXAttribute): JSXAttributeOrSpread;
- visitJSXAttributeValue(n: JSXAttrValue | undefined): JSXAttrValue | undefined;
- visitJSXAttributeName(n: JSXAttributeName): JSXAttributeName;
- visitConditionalExpression(n: ConditionalExpression): Expression;
- visitCallExpression(n: CallExpression): Expression;
- visitBooleanLiteral(n: BooleanLiteral): BooleanLiteral;
- visitBinaryExpression(n: BinaryExpression): Expression;
- visitAwaitExpression(n: AwaitExpression): Expression;
- visitTsTypeParameterDeclaration(n: TsTypeParameterDeclaration | undefined): TsTypeParameterDeclaration | undefined;
- visitTsTypeParameters(nodes: TsTypeParameter[]): TsTypeParameter[];
- visitTsTypeParameter(n: TsTypeParameter): TsTypeParameter;
- visitTsTypeAnnotation(a: TsTypeAnnotation | undefined): TsTypeAnnotation | undefined;
- visitTsType(n: TsType): TsType;
- visitPatterns(nodes: Pattern[]): Pattern[];
- visitImportDeclaration(n: ImportDeclaration): ImportDeclaration;
- visitImportSpecifiers(nodes: ImportSpecifier[]): ImportSpecifier[];
- visitImportSpecifier(node: ImportSpecifier): ImportSpecifier;
- visitNamedImportSpecifier(node: NamedImportSpecifier): NamedImportSpecifier;
- visitImportNamespaceSpecifier(node: ImportNamespaceSpecifier): ImportNamespaceSpecifier;
- visitImportDefaultSpecifier(node: ImportDefaultSpecifier): ImportSpecifier;
- visitBindingIdentifier(i: Identifier): Identifier;
- visitIdentifierReference(i: Identifier): Identifier;
- visitLabelIdentifier(label: Identifier): Identifier;
- visitIdentifier(n: Identifier): Identifier;
- visitStringLiteral(n: StringLiteral): StringLiteral;
- visitNumericLiteral(n: NumericLiteral): NumericLiteral;
- visitPattern(n: Pattern): Pattern;
- visitRestElement(n: RestElement): RestElement;
- visitAssignmentPattern(n: AssignmentPattern): Pattern;
- visitObjectPattern(n: ObjectPattern): Pattern;
- visitObjectPatternProperties(nodes: ObjectPatternProperty[]): ObjectPatternProperty[];
- visitObjectPatternProperty(n: ObjectPatternProperty): ObjectPatternProperty;
- visitKeyValuePatternProperty(n: KeyValuePatternProperty): ObjectPatternProperty;
- visitAssignmentPatternProperty(n: AssignmentPatternProperty): ObjectPatternProperty;
- visitArrayPattern(n: ArrayPattern): Pattern;
- visitArrayPatternElements(nodes: (Pattern | undefined)[]): (Pattern | undefined)[];
- visitArrayPatternElement(n: Pattern | undefined): Pattern | undefined;


### Using multiple plugins

```ts
import { transformSync, plugins } from "@swc/core";

const out = transformSync(src, {
  plugin: plugins(pluginA, pluginB),
});
```
