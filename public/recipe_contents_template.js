(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recipe_contents'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"recipe\" data-category=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"category") || (depth0 != null ? lookupProperty(depth0,"category") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":47}}}) : helper)))
    + "\">\r\n  <div class=\"recipe-contents\">\r\n    <div class=\"recipe-info-container\">\r\n      <a class=\"recipe-title\" href='recipe/"
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":4,"column":43},"end":{"line":4,"column":50}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":52},"end":{"line":4,"column":60}}}) : helper)))
    + "</a>\r\n    </div>\r\n    <div class=\"recipe-info-container\">\r\n      <span class=\"recipe-time\">Total Time: "
    + alias4(((helper = (helper = lookupProperty(helpers,"total_time") || (depth0 != null ? lookupProperty(depth0,"total_time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total_time","hash":{},"data":data,"loc":{"start":{"line":7,"column":44},"end":{"line":7,"column":58}}}) : helper)))
    + "</span>\r\n    </div>\r\n    <div class=\"recipe-info-container\">\r\n      <span class=\"recipe-category\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"category") || (depth0 != null ? lookupProperty(depth0,"category") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data,"loc":{"start":{"line":10,"column":36},"end":{"line":10,"column":48}}}) : helper)))
    + "</span>\r\n    </div>\r\n    <div class=\"recipe-info-container\">\r\n      <button type=\"button\" class=\"action-button recipe-delete\">&#10060;</button>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();