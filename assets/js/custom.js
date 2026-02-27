const { createApp, ref, computed, onMounted, nextTick, reactive  } = Vue
const { useQuasar } = Quasar
const app = createApp({
  setup() {
    const $q = useQuasar()

    const isDark = ref($q.dark.isActive)

    const syncThemeAttr = () => {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    }

    const toggleDark = () => {
      $q.dark.toggle()
      isDark.value = $q.dark.isActive
      syncThemeAttr()
    }
    const ticketitem = ref(false)
    const leftDrawerOpen = ref(false)
    const ClientViewDropdown = ref(null)
    const showcolumns = ref(false)
    const enableFilters = ref(false)
    const platformIcon = (platform) => {
      if (platform === 'windows') return 'fa-brands fa-windows'
      if (platform === 'mac') return 'fa-brands fa-apple'
      return 'fa-solid fa-desktop'
    }
    const chips = ref([
      'Alerts',
      'Antivirus Status',
      'OS Type',
      'OS Version',
      'Created On',
      'Firewall Status',
      'Patch Status',
      'OS Name',
      'Shell Version'
    ])
    const SelectClientValue = ref(null)
    const SelectColumnValue = ref(null)
    const searchTerm = ref('')
    const searchCol = ref('')
    const searchColumnSorting = ref('')
    const searchStatus = ref('')
    const filteredSelectClient = ref([])
    const SelectClient = [
      { label: 'Ashvane Trading Company' },
      { label: 'Duskwood Timber Co.' },
      { label: 'Blackrock Fabrication' },
    ]
    const ticketStatus = [
      { name: 'New', icon: 'fa-kit fa-new', class: 'new', color: '#EB5757' },
      { name: 'In Progress', icon: 'fa-kit fa-inprogress', class: 'inprogress', color: '#F2BE00' },
      { name: 'Awaiting Response', icon: 'fa-kit fa-awaiting', class: 'awaiting', color: '#ED46E7' },
      { name: 'Updated', icon: 'fa-kit fa-updated', class: 'updated', color: '#00CEF2' },
      { name: 'On Hold', icon: 'fa-kit fa-onhold', class: 'onhold', color: '#4B5CEE' }
    ]
    const searchAssignee = ref('')

    const assignees = ref([
      { id: 1, fullName: "John Doe", initials: "JD", bgColor: "#FF6B6B" },
      { id: 2, fullName: "Alicia Schmidt", initials: "AS", bgColor: "#6BCB77" },
      { id: 3, fullName: "Barry Michael", initials: "BM", bgColor: "#4D96FF" },
      { id: 4, fullName: "Naomi Singh", initials: "NS", bgColor: "#FFD93D" },
      { id: 5, fullName: "Ricardo Ito", initials: "RI", bgColor: "#FF6B6B" },
      { id: 6, fullName: "Katrina Ivanova", initials: "KI", bgColor: "#6BCB77" },
      { id: 7, fullName: "Kenji Tanaka", initials: "KT", bgColor: "#4D96FF" },
      { id: 8, fullName: "Javier Gomez", initials: "JG", bgColor: "#FFD93D" },
      { id: 9, fullName: "Ayesha Khan", initials: "AK", bgColor: "#FF6B6B" },
      { id: 10, fullName: "Muhammad Ali", initials: "MA", bgColor: "#6BCB77" },
      { id: 11, fullName: "Sofia Martinez", initials: "SM", bgColor: "#4D96FF" },
      { id: 12, fullName: "Liam O'Connor", initials: "LO", bgColor: "#FFD93D" },
      { id: 13, fullName: "Emma Johnson", initials: "EJ", bgColor: "#FF6B6B" },
      { id: 14, fullName: "Noah Brown", initials: "NB", bgColor: "#6BCB77" },
      { id: 15, fullName: "Olivia Davis", initials: "OD", bgColor: "#4D96FF" },
      { id: 16, fullName: "Ethan Wilson", initials: "EW", bgColor: "#FFD93D" },
      { id: 17, fullName: "Ava Taylor", initials: "AT", bgColor: "#FF6B6B" },
      { id: 18, fullName: "Mason Anderson", initials: "MA", bgColor: "#6BCB77" },
      { id: 19, fullName: "Isabella Thomas", initials: "IT", bgColor: "#4D96FF" },
      { id: 20, fullName: "Lucas Moore", initials: "LM", bgColor: "#FFD93D" },
      { id: 21, fullName: "Mia Jackson", initials: "MJ", bgColor: "#FF6B6B" },
      { id: 22, fullName: "Alexander White", initials: "AW", bgColor: "#6BCB77" },
      { id: 23, fullName: "Charlotte Harris", initials: "CH", bgColor: "#4D96FF" },
      { id: 24, fullName: "Benjamin Martin", initials: "BM", bgColor: "#FFD93D" },
      { id: 25, fullName: "Amelia Thompson", initials: "AT", bgColor: "#FF6B6B" }
    ])
    const selectedAssignee = ref(assignees.value[2])
    const selectedStatus = ref(ticketStatus[1]) // default: In Progress
    const filteredSelectColumn = ref([])
    const ColumnSorting = reactive([
      { name: 'Actions', icon: 'fa-solid fa-bars', disabled: false },
      { name: 'Antivirus Status', icon: 'fa-solid fa-layer-group', disabled: false },
      { name: 'App Status', icon: 'fa-solid fa-layer-group', disabled: false },
      { name: 'Alerts', icon: 'fa-solid fa-bars', disabled: false },
      { name: 'Client', icon: 'fa-solid fa-bars', disabled: false },
      { name: 'Created On', icon: 'fa-regular fa-calendar', disabled: false },
      { name: 'OS Version', icon: 'fa-solid fa-hashtag', disabled: false },
      { name: 'Shell Version', icon: 'fa-solid fa-hashtag', disabled: true },
      { name: 'Patch Status', icon: 'fa-solid fa-layer-group', disabled: true },
      { name: 'Firewall Status', icon: 'fa-solid fa-layer-group', disabled: true },
      { name: 'OS Name', icon: 'fa-solid fa-bars', disabled: true }
    ])
    const SelectColumn = [
      { label: 'Asset Name', icon: 'menu' },
      { label: 'Type' },
      { label: 'Status' },
      { label: 'Client' },
      { label: 'Location' },
      { label: 'Last Login' },
      { label: 'Local IP' },
      { label: 'Public IP' },
      { label: 'OS Name' },
      { label: 'Antivirus Status', icon: 'app' },
      { label: 'Firewall Status', icon: 'app'  },
      { label: 'Description' },
      { label: 'Serial Number' },
      { label: 'App Status', icon: 'app'  },
      { label: 'Primary Contact' },
      { label: 'Date Created' },
      { label: 'Actions' }
    ]
    const allColumns = [
      { name: 'statusicon', label: '', field: 'status', align: 'left' },
      { name: 'assetname', label: 'Asset Name', field: 'assetName', sortable: true, align: 'left' },
      { name: 'type', label: 'Type', field: 'type', sortable: true, align: 'left' },
      { name: 'status', label: 'Status', field: 'status', sortable: true, align: 'left' },
      { name: 'client', label: 'Client', field: 'client', sortable: true, align: 'left' },
      { name: 'location', label: 'Location', field: 'location', sortable: true, align: 'left' },
      { name: 'lastLogin', label: 'Last Login', field: 'lastLogin', sortable: true , align: 'left'},
      { name: 'localIp', label: 'Local IP', field: 'localIp', sortable: true, align: 'left' },
      { name: 'publicIp', label: 'Public IP', field: 'publicIp', sortable: true , align: 'left'},
      { name: 'os', label: 'OS Name', field: 'os', sortable: true, align: 'left' },
      { name: 'antivirus', label: 'Antivirus Status', field: 'antivirusStatus', sortable: true, align: 'left' },
      { name: 'firewall', label: 'Firewall Status', field: 'firewallStatus', sortable: true, align: 'left' },
      { name: 'description', label: 'Description', field: 'description', sortable: true , align: 'left'},
      { name: 'serial', label: 'Serial Number', field: 'serialNumber', sortable: true, align: 'left' },
      { name: 'app', label: 'App Status', field: 'appStatus', sortable: true , align: 'left'},
      { name: 'primaryContact', label: 'Primary Contact', field: 'primaryContact', sortable: true, align: 'left' },
      { name: 'createdOn', label: 'Date Created', field: 'createdOn', sortable: true, align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'left' }

    ]
    const filterview = ref([
      { label: "Mine & Unassigned", count: 12, icon: "fa-solid fa-star", selected: true },
      { label: "Mine", count: 2, icon: null, selected: false },
      { label: "Recently Closed", count: 24, icon: null, selected: false },
      { label: "Recently Updated", count: 32, icon: null, selected: false },
      { label: "Unassigned", count: 5, icon: null, selected: false },
      { label: "Unclosed", count: 11, icon: null, selected: false },
      { label: "Projects", count: 2, icon: null, selected: false }
    ])
    const tableColumns = ref([...allColumns])
    const selectableColumns = ref([])
    const qTableRef  = ref(null)
    const isHorizontallyScrolled = ref(false)


    // Computed property
    const shouldHideIcon = computed(() => {
      return !!SelectClientValue.value // If there is a value selected, return true (hide icon)
    })

    const filteredTicketStatus = computed(() => {
      const search = searchColumnSorting.value.toLowerCase().trim()
    
      if (!search) return ticketStatus
    
      return ticketStatus.filter(item =>
        item.name.toLowerCase().includes(search)
      )
    })

    // Method
    let draggedItem = null;

    const selectStatus = (item) => {
      selectedStatus.value = item
    }

    const filteredAssignees = computed(() => {
      const term = searchAssignee.value.toLowerCase().trim()

      if (!term) return assignees.value
    
      return assignees.value.filter(item =>
        item.fullName.toLowerCase().includes(term)
      )
      
    })
    
    const selectAssignee = (assignee) => {
      selectedAssignee.value = assignee
    }
    
    const onAssigneeMenuClose = () => {
      searchAssignee.value = ''
    }

    const dragStart = (item, event) => {
      draggedItem = item;
      event.dataTransfer.effectAllowed = 'move';
    }

    const drop = (targetItem, event) => {
      if (!draggedItem || draggedItem === targetItem) return;
      
      // Find actual indices in the original ColumnSorting array
      const draggedIndex = ColumnSorting.findIndex(col => col === draggedItem);
      const targetIndex = ColumnSorting.findIndex(col => col === targetItem);
      
      if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return;
      
      // Swap positions in the original array
      const temp = ColumnSorting[draggedIndex];
      ColumnSorting.splice(draggedIndex, 1);
      ColumnSorting.splice(targetIndex, 0, temp);
      draggedItem = null;
    }


    const toggleVisibility = (item) => {
      item.disabled = !item.disabled
    }

    const setDefault = (index) => {
      filterview.value.forEach((item, i) => {
        item.icon = i === index ? 'fa-solid fa-star' : null
      })
    }

    const selectFilterItem = (index) => {
      filterview.value.forEach((item, i) => {
        item.selected = i === index
      })
    }

    const ClientfilterOptions = () => {
      if (searchTerm.value.trim() === '') {
        filteredSelectClient.value = SelectClient
      } else {
        const filtered = SelectClient.filter(option =>
          option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
        )

        // If no results, add a placeholder to keep dropdown open
        if (filtered.length === 0) {
          filteredSelectClient.value = [{ label: '', isPlaceholder: true }]
        } else {
          filteredSelectClient.value = filtered
        }
      }
    }
    const ShowColfilterOptions = () => {
      // exclude first index
      const columns = allColumns.slice(1)

      if (searchCol.value.trim() === '') {
        filteredSelectColumn.value = columns
      } else {
        const filtered = columns.filter(option =>
          option.label.toLowerCase().includes(searchCol.value.toLowerCase())
        )

        // If no results, add a placeholder to keep dropdown open
        filteredSelectColumn.value =
          filtered.length === 0
            ? [{ label: '', isPlaceholder: true }]
            : filtered
      }
    }

    const toggleSelection = (option, isSelected) => {
      if (isSelected) {
        // Add to selected array if not already there
        if (!SelectColumnValue.value?.includes(option)) {
          if (!SelectColumnValue.value) SelectColumnValue.value = []
          SelectColumnValue.value.push(option)
        }
      } else {

        SelectColumnValue.value = SelectColumnValue.value.filter(
          item => item !== option
        )
      }
    }

    const toggleColumn = (option) => {
      const index = SelectColumnValue.value.findIndex(item => item.label === option.label)
      if (index > -1) {
        SelectColumnValue.value.splice(index, 1)
      } else {
        SelectColumnValue.value.push(option)
      }
    }

    const filterColumns = (val, update) => {
      update(() => {
        if (!val) {
          filteredSelectColumn.value = allColumns.filter(c => c.label)
          return
        }

        const needle = val.toLowerCase()
        filteredSelectColumn.value = allColumns.filter(
          c => c.label && c.label.toLowerCase().includes(needle)
        )
      })
    }

    const onColumnDropdownClose = () => {
      searchCol.value = ''
      filteredSelectColumn.value = allColumns.filter(col => col.label)
    }

    const onColumnSortingMenuClose = () => {
      searchColumnSorting.value = ''
    }
    const onMenuClose = () => {
      searchStatus.value = ''
    }

    const applyColumnChanges = () => {
      if (!SelectColumnValue.value.length) {
        tableColumns.value = [...allColumns]
      } else {
        const selectedLabels = SelectColumnValue.value.map(c => c.label)

        tableColumns.value = allColumns.filter(col =>
          col.label === '' || selectedLabels.includes(col.label)
        )
      }

      showcolumns.value = false
    }

    const resetColumns = () => {
      tableColumns.value = [...allColumns]
      SelectColumnValue.value = allColumns.filter(col => col.label)
      showcolumns.value = false
    }


    const removeColumn = (index) => {
      SelectColumnValue.value.splice(index, 1)
    }

    const toggleFilters = () => {
      enableFilters.value = !enableFilters.value
    }

    const visibleSelectedLabels = computed(() => {
      if (!SelectColumnValue.value) return ''

      return SelectColumnValue.value
        .slice(0, 2)
        .map(o => o.label)
        .join(', ')
    })

    const extraSelectedCount = computed(() => {
      if (!SelectColumnValue.value) return 0

      return Math.max(SelectColumnValue.value.length - 2, 0)
    })

    const filteredColumnSorting = computed(() => {
      if (!searchColumnSorting.value || searchColumnSorting.value.trim() === '') {
        return ColumnSorting
      }
      const searchLower = searchColumnSorting.value.toLowerCase().trim()
      return ColumnSorting.filter(item => 
        item.name.toLowerCase().includes(searchLower)
      )
    })


    const sortIcon = (tableProps, col) => {
      if (tableProps.sortBy !== col.name) {
        return 'hgi hgi-stroke hgi-arrow-down-02'
      }

      return tableProps.descending
        ? 'hgi hgi-stroke hgi-arrow-down-02'
        : 'hgi hgi-stroke hgi-arrow-up-02'
    }
    const clientSelectRef = ref(null)


    const clearSelectAndBlur = () => {
      nextTick(() => {
        clientSelectRef.value?.blur()
        clientSelectRef.value?.hidePopup()
      })
    }

    const activeBtn = ref('list')

    const setActive = (val) => {
      activeBtn.value = val
    }


    // Document sidebar: id, name, icon, level, parentId
    const docNavItems = ref([
      { id: 1, name: 'Starred & Recent', icon: 'fa-regular fa-star', level: 0, parentId: null, expandable: false, starred: false, active: false },
      { id: 2, name: 'Gorelo Internal', icon: 'fa-solid fa-building', level: 0, parentId: null, expandable: false, starred: true, active: false },
      { id: 3, name: 'Vendors', icon: 'fa-solid fa-folder', level: 0, parentId: null, expandable: true, starred: false, active: false },
      { id: 4, name: 'Cloudflare', icon: 'fa-solid fa-cloud', level: 1, parentId: 3, expandable: false, starred: false, active: false },
      { id: 5, name: 'And another one', icon: 'fa-solid fa-share-nodes', level: 1, parentId: 3, expandable: false, starred: false, active: false },
      { id: 6, name: 'Nested Doc', icon: 'fa-regular fa-file', level: 1, parentId: 3, expandable: true, starred: false, active: false },
      { id: 7, name: 'Another Nested Doc', icon: 'fa-regular fa-file', level: 2, parentId: 6, expandable: false, starred: false, active: false },
      { id: 8, name: 'Sample Document', icon: 'fa-regular fa-file', level: 0, parentId: null, expandable: false, starred: true, active: true },
      { id: 9, name: 'Naming/IP Conventions', icon: 'fa-solid fa-gear', level: 0, parentId: null, expandable: false, starred: false, active: false },
      { id: 10, name: 'Contractors', icon: 'fa-solid fa-hard-hat', level: 0, parentId: null, expandable: false, starred: false, active: false }
    ])
    const docNavExpanded = ref([3, 6])

    const docNavToggle = (id) => {
      const i = docNavExpanded.value.indexOf(id)
      if (i > -1) docNavExpanded.value.splice(i, 1)
      else docNavExpanded.value.push(id)
    }
    const docNavIsExpanded = (id) => docNavExpanded.value.includes(id)
    const docNavChildren = (parentId) => docNavItems.value.filter(x => x.parentId === parentId)
    const docNavRoot = () => docNavItems.value.filter(x => x.level === 0)

    const docNavSelect = (id) => {
      docNavItems.value.forEach(x => { x.active = x.id === id })
    }

    const docNavTree = computed(() => {
      const build = (parentId) => {
        const list = parentId === null ? docNavRoot() : docNavChildren(parentId)
        return list.map(item => ({
          ...item,
          children: item.expandable && docNavIsExpanded(item.id) ? build(item.id) : []
        }))
      }
      return build(null)
    })

    const btnClass = (val) => {
      return {
        selectedbtn: activeBtn.value === val
      }
    }

    const clearClientSelect = () => {
      SelectClientValue.value = null

      nextTick(() => {
        clientSelectRef.value?.blur()
        clientSelectRef.value?.hidePopup()
      })
    }

    const handleTableScroll = (e) => {
      isHorizontallyScrolled.value = e.target.scrollLeft > 0
    }


    onMounted(() => {
      // Ensure CSS theme variables match Quasar's initial mode
      syncThemeAttr()

      filteredSelectClient.value = SelectClient
      SelectColumnValue.value = allColumns.filter(col => col.label)
      filteredSelectColumn.value = allColumns.filter(col => col.label)


      nextTick(() => {
        if (!qTableRef.value) return
    
        // Get the internal scroll container (the div that actually scrolls)
        const scrollContainer = qTableRef.value.$el.querySelector('.q-table__middle') // Quasar v2
    
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', (e) => {
            isHorizontallyScrolled.value = scrollContainer.scrollLeft > 0
          })
        }
      })
    })

    setTimeout(() => {
      document.getElementById('q-app').classList.add('mounted')
    }, 50) // 50ms usually enough


    return {
      isDark,
      toggleDark,
      searchAssignee,
      selectedAssignee,
      assignees,
      filteredAssignees,
      selectAssignee,
      onAssigneeMenuClose,
      leftDrawerOpen,
      qTableRef,
      isHorizontallyScrolled,
      dragStart, 
      drop,
      ticketStatus,
      ticketitem,
      filteredTicketStatus,
      selectStatus,
      selectedStatus ,
      toggleVisibility,
      clearClientSelect,
      clientSelectRef,
      setActive,
      clearSelectAndBlur,
      clientSelectRef,
      btnClass,
      ClientViewDropdown,
      platformIcon,
      SelectClientValue,
      searchTerm,
      searchCol,
      searchColumnSorting,
      filteredColumnSorting,
      visibleSelectedLabels,
      setDefault,
      extraSelectedCount,
      filteredSelectClient,
      SelectClient,
      onColumnDropdownClose,
      onColumnSortingMenuClose,
      SelectColumnValue,
      removeColumn,
      filterColumns,
      toggleSelection,
      filteredSelectColumn,
      SelectColumn,
      ColumnSorting,
      shouldHideIcon,
      toggleColumn,
      ClientfilterOptions,
      ShowColfilterOptions,
      toggleFilters,
      showcolumns,
      sortIcon,
      tableColumns,
      applyColumnChanges,
      resetColumns,
      chips,
      filterview,
      enableFilters,
      selectFilterItem,
      docNavItems,
      docNavExpanded,
      docNavToggle,
      docNavIsExpanded,
      docNavChildren,
      docNavRoot,
      docNavSelect,
      docNavTree,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      activeBtn,
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 = show all rows
      },

      rows: ref([
        {
          id: 1,
          assetName: 'GTEST-VM01',
          platform: 'windows',
          type: 'Desktop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'Up To Date',
          firewallStatus: 'Enabled',
          appStatus: 'Up To Date',
          description: 'Windows365 VM',
          serialNumber: 'CVV2-G6FD-XQVD',
          primaryContact: 'Barry Michael',
          createdOn: 'Aug 23, 2025'
        },
        {
          id: 2,
          assetName: 'mikel@elevate.au',
          platform: 'windows',
          type: 'Desktop',
          status: 'Inactive',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'mikel@elevate.au',
          localIp: '10.10.105.124',
          publicIp: '138.217.110.94',
          os: 'Microsoft Windows 11 Pro',
          antivirusStatus: 'N/A',
          firewallStatus: 'Enabled',
          appStatus: 'Up To Date',
          description: 'Fabrikam-VM-02',
          serialNumber: 'ASD2-F8GH-J3KL',
          primaryContact: 'Alicia Schmidt',
          createdOn: 'Jan 15, 2024'
        },
        {
          id: 3,
          assetName: 'mikel@elevate.au',
          platform: 'windows',
          type: 'Desktop',
          status: 'Inactive',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'mikel@elevate.au',
          localIp: '10.10.105.124',
          publicIp: '138.217.110.94',
          os: 'Microsoft Windows 11 Pro',
          antivirusStatus: 'Up To Date',
          firewallStatus: 'N/A',
          appStatus: 'Up To Date',
          description: 'Adatum-Cloud-03',
          serialNumber: 'ZXC3-VBHN-M4LK',
          primaryContact: 'Naomi Singh',
          createdOn: 'Nov 9, 2024'
        },
        {
          id: 4,
          assetName: 'GTEST-VM01',
          platform: 'mac',
          type: 'Laptop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'Up To Date',
          firewallStatus: 'Disabled',
          appStatus: 'Up To Date',
          description: 'Wingtip-SQL-04',
          serialNumber: 'PQI4-UYT-R5EW',
          primaryContact: 'Ricardo Ito',
          createdOn: 'Feb 2, 2024'
        },
        {
          id: 5,
          assetName: 'GTEST-VM01',
          platform: 'mac',
          type: 'Laptop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'Up To Date',
          firewallStatus: 'Disabled',
          appStatus: 'Up To Date',
          description: 'Northwind-Dev-05',
          serialNumber: 'LKJ5-H2GF-D8SA',
          primaryContact: 'Katrina Ivanova',
          createdOn: 'Sept 17, 2024'
        },
        {
          id: 6,
          assetName: 'GTEST-VM01',
          platform: 'windows',
          type: 'Desktop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'N/A',
          firewallStatus: 'N/A',
          appStatus: 'Up To Date',
          description: 'Windows365 VM',
          serialNumber: 'MNB6-V3CX-Z7AQ',
          primaryContact: 'Barry Michael',
          createdOn: 'June 29, 2024'
        },
        {
          id: 7,
          assetName: 'mikel@elevate.au',
          platform: 'windows',
          type: 'Desktop',
          status: 'Inactive',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'mikel@elevate.au',
          localIp: '10.10.105.124',
          publicIp: '138.217.110.94',
          os: 'Microsoft Windows 11 Pro',
          antivirusStatus: 'N/A',
          firewallStatus: 'Enabled',
          appStatus: 'Up To Date',
          description: 'AdventureWorks-Test-06',
          serialNumber: 'UYT7-R4EW-Q8AS',
          primaryContact: 'Barry Michael',
          createdOn: 'Mar 11, 2024'
        },
        {
          id: 8,
          assetName: 'GTEST-VM01',
          platform: 'mac',
          type: 'Laptop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'N/A',
          firewallStatus: 'Enabled',
          appStatus: 'Up To Date',
          description: 'Windows365 VM',
          serialNumber: 'HGF8-D5SA-Z9XCV',
          primaryContact: 'Kenji Tanaka',
          createdOn: 'Oct 22, 2024'
        },
        {
          id: 9,
          assetName: 'GTEST-VM01',
          platform: 'windows',
          type: 'Desktop',
          status: 'Active',
          client: 'Ashvane Trading Company',
          location: 'Boralus - 122 Yards Lne',
          lastLogin: 'GTEST-VM01\\gorelo',
          localIp: '10.1.0.4',
          publicIp: '104.210.93.30',
          os: 'Microsoft Windows 11 Enterprise',
          antivirusStatus: 'Up To Date',
          firewallStatus: 'Disabled',
          appStatus: 'Up To Date',
          description: 'Contoso-Azure-01',
          serialNumber: 'QWE1-R7TY-U2IO',
          primaryContact: 'Javier Gomez',
          createdOn: 'Dec 1, 2024'
        }
      ])


    }
  }
})

app.use(Quasar, {
  config: {
    dark: true,
    iconMapFn: (iconName) => {
      // if already has hgi class, use directly
      if (iconName.startsWith('hgi ')) {
        return { cls: iconName }
      }

      // auto-prefix hugeicons
      return {
        cls: 'hgi hgi-stroke hgi-' + iconName
      }
    }
  },
  
})
app.mount('#q-app')