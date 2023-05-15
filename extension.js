const GETTEXT_DOMAIN = 'byewall';

const { GObject, St, Gio, Gtk, Gdk } = imports.gi;
const GLib = imports.gi.GLib;
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

let url = "https://12ft.io/";

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    
    _init() {
        super._init(0.0, _('My Shiny Indicator'));
    
        this.add_child(new St.Icon({
            icon_name: 'emblem-documents',
            style_class: 'system-status-icon',
        }));
    
        let submenuItem = new PopupMenu.PopupSubMenuMenuItem(_("Services"));
        this.menu.addMenuItem(submenuItem);
    
        let item1 = new PopupMenu.PopupMenuItem(_('12ft.io'));
        item1.connect('activate', () => {
            submenuItem.setOpen(true);
        });
        submenuItem.menu.addMenuItem(item1);
    
        let item2 = new PopupMenu.PopupMenuItem(_('Archive.is'));
        item2.connect('activate', () => {
            submenuItem.setOpen(true);
        });
        submenuItem.menu.addMenuItem(item2);
    
        let item3 = new PopupMenu.PopupMenuItem(_('RemovePaywall.com'));
        item3.connect('activate', () => {
            submenuItem.setOpen(true);
        });
        submenuItem.menu.addMenuItem(item3);
    
        let item4 = new PopupMenu.PopupMenuItem(_('LeiaIsso.net'));
        item4.connect('activate', () => {
            submenuItem.setOpen(true);
        });
        submenuItem.menu.addMenuItem(item4);
    
        let entryItem = new PopupMenu.PopupBaseMenuItem({
            activate: false,
            can_focus: false,
            reactive: false,
        });
    
        let entryBox = new St.BoxLayout({
            style_class: 'entry-box',
            width: 300,
        });
    
        let entry = new St.Entry({
            name: 'entry',
            hint_text: 'Type here...',
            width: 280,
        });
    
        entryBox.add(entry);
        entryItem.actor.add_child(entryBox);
        this.menu.addMenuItem(entryItem);
    
        entry.clutter_text.connect('activate', () => {
            let text = entry.get_text(); //enter
        });
    
        entryBox.add(entry);
        entryItem.actor.add_child(entryBox);
        this.menu.addMenuItem(entryItem);
    }
    });    


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
