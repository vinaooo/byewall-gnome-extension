const GETTEXT_DOMAIN = 'my-indicator-extension';

const {  GObject, St, Gio } = imports.gi;
const GLib = imports.gi.GLib;
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    
    _init() {
        super._init(0.0, _('My Shiny Indicator'));
    
        this.add_child(new St.Icon({
            icon_name: 'face-smile-symbolic',
            style_class: 'system-status-icon',
        }));
    
        let submenuItem = new PopupMenu.PopupSubMenuMenuItem(_("Options"));
        this.menu.addMenuItem(submenuItem);
    
        let item1 = new PopupMenu.PopupMenuItem(_('Show Notification'));
        item1.connect('activate', () => {
            Main.notify(entry.get_text());
        });
        submenuItem.menu.addMenuItem(item1);
    
        let item2 = new PopupMenu.PopupMenuItem(_('Open Google'));
        item2.connect('activate', () => {
            Gio.app_info_launch_default_for_uri('https://www.google.com');
        });
        submenuItem.menu.addMenuItem(item2);
    
        let item3 = new PopupMenu.PopupMenuItem(_('Open Wikipedia'));
        item3.connect('activate', () => {
            Gio.app_info_launch_default_for_uri('https://www.wikipedia.org');
        });
        submenuItem.menu.addMenuItem(item3);
    
        let item4 = new PopupMenu.PopupMenuItem(_('Open Reddit'));
        item4.connect('activate', () => {
            Gio.app_info_launch_default_for_uri('https://www.reddit.com');
        });
        submenuItem.menu.addMenuItem(item4);
    
        let entryItem = new PopupMenu.PopupBaseMenuItem({
            activate: false,
            can_focus: false,
            reactive: false,
        });
    
        let entry = new St.Entry({
            name: 'entry',
            hint_text: 'Type here...',
        });
    
        entryItem.actor.add_child(entry);
        this.menu.addMenuItem(entryItem);
        

    
    }});    


class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.byewall');

        this._indicator = new Indicator();
        this.settings.bind(
            'show-indicator',
            this._indicator,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
