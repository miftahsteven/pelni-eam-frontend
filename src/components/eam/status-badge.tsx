import { Badge } from "@/components/ui/badge"
import { PlanningStatus } from "@/lib/mocks/planning"
import { BoQStatus } from "@/lib/mocks/boq"
import { PRStatus } from "@/lib/mocks/purchase-request"
import { DeliveryOrderStatus, DOItemStatus } from "@/lib/mocks/delivery-order"
import { PurchaseOrderStatus, POItemStatus } from "@/lib/mocks/purchase-order"
import { WBSAssignmentStatus, WBSMasterStatus } from "@/lib/mocks/wbs-assignment"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: PlanningStatus | BoQStatus | PRStatus | DeliveryOrderStatus | DOItemStatus | PurchaseOrderStatus | POItemStatus | WBSAssignmentStatus | WBSMasterStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: PlanningStatus | BoQStatus | PRStatus | DeliveryOrderStatus | DOItemStatus | PurchaseOrderStatus | POItemStatus | WBSAssignmentStatus | WBSMasterStatus) => {
    switch (status) {
      case "Waiting Assignment":
      case "Waiting Assignment Review":
      case "Waiting PO Approval":
      case "Waiting Arrival":
      case "Under Verification":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Partially Assigned":
      case "Partially Fulfilled":
      case "Partial Accepted":
      case "Partially Accepted":
      case "Short Delivery":
      case "Short Delivered":
        return "bg-cyan-50 text-cyan-700 border-cyan-200"
      case "Fully Assigned":
      case "Ready for PO":
      case "Assignment Approved":
      case "Released":
      case "Sent to Vendor":
      case "Fully Fulfilled":
      case "Arrived":
      case "Verified":
      case "Accepted":
      case "Delivered":
      case "Ready for GR":
      case "Ready for Service Confirmation":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Need Revision":
      case "Revision Required":
      case "Damaged":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Rejected":
      case "Cancelled":
      case "Closed":
      case "Inactive":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("font-semibold shadow-sm whitespace-nowrap", getStatusColor(status), className)}
    >
      {status}
    </Badge>
  )
}
